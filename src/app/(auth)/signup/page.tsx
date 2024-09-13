"use client";
import SignUpForm from "@/components/auth/signup";
import { useAuthProvider } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignInPage = () => {
  const { isAuthenticated } = useAuthProvider();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

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
