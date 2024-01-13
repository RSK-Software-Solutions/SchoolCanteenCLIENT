import React from "react";
import Register from "../../components/authComponents/Register";

const RegisterPage = () => {
  return (
    <div className="h-screen flex justify-center">
      <form className="flex flex-col self-center">
        <Register />
      </form>
    </div>
  );
};

export default RegisterPage;
