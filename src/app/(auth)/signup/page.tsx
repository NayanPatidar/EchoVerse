"use client";
import SignUpForm from "@/components/auth/signup";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuthProvider } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignInPage = () => {
  const { isAuthenticated, isLoading } = useAuthProvider();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/");
      } else {
        setCheckingAuth(false);
      }
    }
  }, [isLoading, isAuthenticated]);

  if (checkingAuth || isLoading || isAuthenticated) {
    return (
      <div className=" text-white w-full h-full flex text-2xl font-semibold justify-center items-center gap-5 ">
        <span>
          <LoadingSpinner />
        </span>
        Loading ...
      </div>
    );
  }

  return (
    <div className=" w-96 h-auto bg-[#2d2d2d85] rounded-lg p-5 border border-white">
      <div className=" text-white font-semibold text-xl w-full flex justify-center cursor-default">
        Sign Up
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignInPage;
