"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z  from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

// схема проверки формы
const FormSchema = z.object({
  username: z.
      string().
      min(1, 'Username is required1'),
  password: z.
      string().
      min(1, 'Password is required1').
      min(8, 'Password must have than 8 characters1'),
});

const LoginFormOld = () => {
  // передаем useFormState функцию login из actions.ts
  // первоначальное состояние undefined (чтобы не было сообщении об ошибке)
  // в login передаем любые данные any и данные этой формы через FormData
  //const [formState, formAction] = useFormState<any, FormData>(login, {message: ''});
  const [formState, formAction] = useFormState<any, FormData>(login, INITIAL_STATE);

  // При нажатии button запускается formAction, состояние которого state в начале undefined
  // и вызывается функцию login из actions.ts и передается ему данные формы через FormData и состояние undefined

  const { toast } = useToast();
  const router = useRouter();

  //const {preUserName, prePassWord} = formState?.data || {};

  console.log("formState?.message=",formState?.message);
  // console.log("preUserName=",preUserName);
  // console.log("prePassWord=",prePassWord);

  useEffect(() => {
    // console.log("useEffect=",formState?.message);
    if (formState?.message) {
        toast({
          title: formState?.message,
          description: formState.message,
          variant:"destructive",
          })}
      }, [formState?.message]);


  // устанвливаем схему проверки формы
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  console.log("formState=", formState);


  return (
    <Form {...form}>
      <form action={formAction} className="w-full">
        <div className="space-y-2">
          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>

        {/* formAction возврашает состояние в state после выполнении серверной функции login из actions.ts  */}
        {/* если ошибка то вывод сообщение */}
        {/* {formState?.error && <p>{formState.error}</p>} */}

        {/* {
          formState.message ? 
           <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>  
                 {formState.message}
           </div> : null
        } */}



      </form>
    </Form>
  );
};

export default LoginFormOld;