import React from "react";
import Register from "@/features/authentication/Register";

const RegisterPage = () => {
  return (
    <div className='h-screen flex flex-col justify-center bg-muted'>
      <form className="flex flex-col self-center">
        <Register />
      </form>
    </div>
  );
};

export default RegisterPage;
