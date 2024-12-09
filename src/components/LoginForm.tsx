"use client";

//import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { login } from "@/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";


const INITIAL_STATE = {
  zodErrors: null,
  message: null,
  data: {
    username: "",
    password: "",
  }
}

const LoginForm = () => {
  // передаем useFormState функцию login из actions.ts
  // первоначальное состояние undefined (чтобы не было сообщении об ошибке)
  // в login передаем любые данные any и данные этой формы через FormData
  //const [formState, formAction] = useFormState<any, FormData>(login, {message: ''});
  const [formState, formAction] = useFormState<any, FormData>(login, INITIAL_STATE);

  // При нажатии button запускается formAction, состояние которого state в начале undefined
  // и вызывается функцию login из actions.ts и передается ему данные формы через FormData и состояние undefined

  const { toast } = useToast();
  const router = useRouter();

  const {username, password} = formState?.data || {};

  console.log("formState?.message2=",formState?.message);
  console.log("formState?=",formState);
  // console.log("preUserName=",preUserName);
  // console.log("prePassWord=",prePassWord);

  useEffect(() => {
    console.log("useEffect=",formState?.message);
    toast({
      title: formState?.message ? "Error" : "Success",
      description: formState.message,
      variant:"destructive",
    });
  }, [formState, toast]);


  return (
        <form action={formAction} className="flex flex-col gap-3">
            <div className="space-y-2">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" defaultValue={username}
                type="text" placeholder="username"/>
                
                {formState?.zodErrors?.formUsername}
                
            </div>
            <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" defaultValue={password}
                type="password" placeholder="password"/>
                
                {formState?.zodErrors?.formPassword}
            </div>
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                      Login
            </button>

        </form>
  )
}
        // {
        //   formState.message ? 
        //    <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>  
        //          {formState.message}
        //    </div> : null
        // }


export default LoginForm;
