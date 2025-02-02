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
//import { useRouter } from "next/navigation";

import { login } from "@/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";


const INITIAL_STATE = {
  zodErrors: null,
  message: null,
  data: {
    UsrLog: "",
    UsrPsw: "",
  }
}

// схема проверки формы
const FormSchema = z.object({
  UsrLog: z.
      string().
      min(1, 'Username is required1'),
  UsrPsw: z.
      string().
      min(1, 'Password is required1').
      min(4, 'Password must have than 4 characters1'),
});

const LoginForm = () => {
  // передаем useFormState функцию login из actions.ts
  // первоначальное состояние undefined (чтобы не было сообщении об ошибке)
  // в login передаем любые данные any и данные этой формы через FormData
  //const [formState, formAction] = useFormState<any, FormData>(login, {message: ''});
  const [formState, formAction] = useFormState<any, FormData>(login, INITIAL_STATE);

  // При нажатии button запускается formAction, состояние которого state в начале undefined
  // и вызывается функцию login из actions.ts и передается ему данные формы через FormData и состояние undefined

  const { toast } = useToast();
  //const router = useRouter();

  //const {preUserName, prePassWord} = formState?.data || {};

 // console.log("formState?.message=",formState?.message);

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
      UsrLog: "",
      UsrPsw: "",
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="w-full">
        <div className="space-y-2">
          {/* username */}
          <FormField
            control={form.control}
            name="usrlog"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="usrlog" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="usrpsw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Вход
        </Button>

        {/* formAction возврашает состояние в state после выполнении серверной функции login из actions.ts  */}
        {/* если ошибка то вывод сообщение */}
        {/* {formState?.error && <p>{formState.error}</p>} */}

      </form>
    </Form>
  );
};

export default LoginForm;
