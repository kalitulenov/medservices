"use server";

import { sessionOptions, SessionData, dafaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {z}  from "zod";


import { db } from "@/lib/db";

// ==============================================================================================
export const getSession = async () => {
  // используя iron-session применяя ключ из sessionOptions расшифруем cookies
  // и из него получить данные сеанса , а из саенса получить данные пользователя
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  console.log("Act_session=", session);

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
  prevState: any,
  formData: FormData
) {
  // получить данные сеанса
  const session = await getSession();
  //console.log("Act_Login_session=", session);

  console.log("Act_Login_formData=", formData);
  
  const formDataObj = {
    formUsername: formData.get("usrlog") as string,
    formPassword: formData.get("usrpsw") as string,
    formUserId: formData.get("id") as string,
  }

  console.log("Act_Login_formUsername=", formDataObj.formUsername);
  console.log("Act_Login_formPassword=", formDataObj.formPassword);
  console.log("Act_Login_formUserId=", formDataObj.formUserId);

  // схема проверки формы
  const FormSchema = z.object({
    formUsername: z.string().min(1, {message:'Username is required'}),
    formPassword: z.string().min(1, {message:'Password is required'}),                            
  });

  // console.log("ActPrevState=", prevState);

  const validatedFields = FormSchema.safeParse(formDataObj);
  
  console.log("Act_Login_validatedFields=", validatedFields);

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
    const user = await db.sprusr.findUnique({
      where: { usrlog: formDataObj.formUsername, usrpsw: formDataObj.formPassword },
    });

    console.log("Act_Login_user=", user);

    // если имя пользователя из формы не совпадает с именем из БД , то ошибка
    if (formDataObj.formUsername !== String(user?.usrlog)) {
      return { ...prevState, message: "wrong credentials" };
    }
    // перевод string to int
    // num = `${num}`
    // num = num + ''
    // num = String(num)
    // num = num.toString()

    // если имя пользователя из формы совпадает с именем из БД, то меняем данные сеанса из БД
    session.userId = formDataObj.formUserId;
    session.userorg = user?.usrorg;
    session.username = formDataObj.formUsername;
    session.usertype = user?.usrtyp;
    session.isLoggedIn = true;

    // сохраняем сеанс
    await session.save();
    console.log("Act_Login_session2=", session);

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

