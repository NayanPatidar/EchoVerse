import SignInForm from "@/components/auth/signin";
import SignUpForm from "@/components/auth/signup";
import React from "react";

const SignInPage = () => {
  return (
    <div className=" w-96 h-auto bg-[#2d2d2d85] rounded-lg p-5">
      <div className=" text-white font-semibold text-xl w-full flex justify-center cursor-default">
        Sign Up
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignInPage;
