"use server";

import { sessionOptions, SessionData, dafaultSession } from "@/lib";
import { getIronSession } from "iron-session";
//import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {z}  from "zod";

import { db } from "@/lib/db";

//  структура меню -------------------
interface StrLogin {
  zodErrors: string,
  message: string,
  data: {
    UsrLog: string,
    UsrPsw: string,
  }
}



// ==============================================================================================
export const getSession = async () => {
  // используя iron-session применяя ключ из sessionOptions расшифруем cookies
  // и из него получить данные сеанса , а из саенса получить данные пользователя
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  //console.log("Act_session=", session);

  if (!session.isLoggedIn) {
    session.isLoggedIn = dafaultSession.isLoggedIn; // меняем false на true и наоборот
  }

  // CHECK THE USER IN THE DB получаем данные из БД isBlocked для сравнение данными из сеанса
  // session.isBlocked = isBlocked; // пользователь м.б. заблокирован админом
  // session.isPro = isPro;

  return session;
};


// ==============================================================================================
// Получает данные формы LoginForm через formAction в FormData
// и prevState предыдущая состояние
// оно мб ошибокой error и оно будет undefined или string
//export const login = async (prevState: { error: undefined | string }, formData: FormData) => {

export async function login(
  // formState: { message: string },
  prevState: StrLogin,
  // prevState: {
  //   zodErrors: string,
  //   message: string,
  //   data: {
  //     UsrLog: string,
  //     UsrPsw: string,
  //   },
  formData: FormData
) {
  // получить данные сеанса
  const session = await getSession();
  //console.log("Act_Login_session=", session);

  //console.log("Act_Login_formData=", formData);
  
  const formDataObj = {
    formUsername: formData.get("UsrLog") as string,
    formPassword: formData.get("UsrPsw") as string,
    formUserId: formData.get("id") as string,
  }

  // console.log("Act_Login_formUsername=", formDataObj.formUsername);
  // console.log("Act_Login_formPassword=", formDataObj.formPassword);
  // console.log("Act_Login_formUserId=", formDataObj.formUserId);

  // схема проверки формы
  const FormSchema = z.object({
    formUsername: z.string().min(1, {message:'Username is required'}),
    formPassword: z.string().min(1, {message:'Password is required'}),                            
  });

  // console.log("ActPrevState=", prevState);

  const validatedFields = FormSchema.safeParse(formDataObj);
  
 // console.log("Act_Login_validatedFields=", validatedFields);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
    }
  }


  // const formUsername = formData.get("username") as string;
  // const formPassword = formData.get("password") as string;
  // const formUserId = formData.get("id") as string;

  // console.log("Act_Login_formUsername=", formDataObj.formUsername);
  // console.log("Act_Login_formPassword=", formDataObj.formPassword);

  // Проверка данных на валидность
  // if (typeof formDataObj.formUsername !== "string" || formDataObj.formUsername.length < 3) {
  //   return { ...prevState, message: "Title must be longer" };
  // }
  // if (typeof formDataObj.formPassword !== "string" || formDataObj.formPassword.length < 3) {
  //   return { ...prevState, message: "Code must be longer" };
  // }

  // CHECK THE USER IN THE DB получаем данные из БД для сравнение данными из формы
  //const user = await DB.getUser({username,password});
  // check if email already exist
  // try {

  // -------------- Вариант 1 -------------------------------------
    // const user = await db.sprusr.findUnique({
    //   where: { usrlog: formDataObj.formUsername, usrpsw: formDataObj.formPassword },
    // });

  // -------------- Вариант 2 -------------------------------------
    const userArr = await db.$queryRaw`SELECT SprUsr.*,SprOrg.OrgKod 
                                        FROM SprUsr LEFT OUTER JOIN SprOrg  
                                                    ON SprUsr.UsrOrg = SprOrg.OrgNam
                                        WHERE SprUsr.UsrLog=${formDataObj.formUsername} AND
                                              SprUsr.UsrPsw=${formDataObj.formPassword};`

    if (!userArr || userArr == undefined)  return { ...prevState, message: "нет организаций" };
    

  //  console.log("Act_Login_userArr=", userArr);
   // console.log("Act_Login_user2=", formDataObj.formUsername,user?.usrlog);
    const user  = userArr[0];
    // если имя пользователя из формы не совпадает с именем из БД , то ошибка
    if (formDataObj.formUsername !== String(user.usrlog)) {
      return { ...prevState, message: "wrong credentials" };
    }
    // перевод string to int
    // num = `${num}`
    // num = num + ''
    // num = String(num)
    // num = num.toString()

    // если имя пользователя из формы совпадает с именем из БД, то меняем данные сеанса из БД
    session.userId = formDataObj.formUserId;
    session.userorgkod = user?.orgkod;
    session.userorg = user?.usrorg;
    session.username = formDataObj.formUsername;
    session.usertype = user?.usrtyp;
    session.isLoggedIn = true;
    session.isOpen = true;
    session.isBlocked = false;
    session.isAdd = false;

    // сохраняем сеанс
    await session.save();
   // console.log("Act_Login_session2=", session);

    // перенаправить
    redirect("/");

  // } catch (err: unknown) {
  //   if (err instanceof Error) {
  //     return { message: err.message };
  //   } else {
  //     return { message: "Something went wrong..." };
  //   }
  // }
}

// ==============================================================================================
export const logout = async () => {
  // получить данные сеанса
  const session = await getSession();

  // уничтожить данные сеанса
  session.destroy();

  // перенаправить
  redirect("/");
};

// // ==============================================================================================
// export const GetSprOrg = async () => {
//   console.log("GetSprOrg=");
//   try {
//     const data = await db.sprorg.findMany();
//       console.log("data=",data);
//       return data;
//     } catch (error) {
//         console.error(error);
//     }
// };

