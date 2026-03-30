"use client";
import SignUpForm from "@/components/auth/signup";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SignUpPage = () => {
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
      <div className="text-white w-full h-full flex text-2xl font-semibold justify-center items-center gap-5">
        <LoadingSpinner />
        Loading ...
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-4">
      {/* Card */}
      <div className="bg-[#161616] border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center px-8 pt-8 pb-6 border-b border-white/[0.06]">
          <Image
            src="/EchoverseLogoFinal.png"
            width={160}
            height={28}
            alt="EchoVerse"
            className="mb-5"
            priority
          />
          <h1 className="text-white font-bold text-xl tracking-tight">
            Create an account
          </h1>
          <p className="text-[#777] text-sm mt-1">
            Join EchoVerse for free
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
