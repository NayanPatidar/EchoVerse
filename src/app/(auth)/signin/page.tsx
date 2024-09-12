import SignInForm from "@/components/auth/signin";
import React from "react";

const SignInPage = () => {
  return (
    <div className=" w-96 h-80 bg-[#2d2d2d85] rounded-lg p-5">
      <div className=" text-white font-semibold text-xl w-full flex justify-center cursor-default">
        Sign In
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
