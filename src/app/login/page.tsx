import LoginForm from "@/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-sky-300 p-10 m-48 rounded-md">
     {/* вызывает из components */}
      <LoginForm />  
    </div>
  );
};

export default LoginPage;
