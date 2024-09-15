"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuthProvider } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { date } from "zod";

const Profile = () => {
  const { isAuthenticated, isLoading, session, tokenDetails } =
    useAuthProvider();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setCheckingAuth(false);
      }
    }
  }, [isLoading, isAuthenticated, router]);

  if (checkingAuth || isLoading || !isAuthenticated) {
    return (
      <div className=" text-white w-full flex text-2xl font-semibold justify-center items-center gap-5 ">
        <span>
          <LoadingSpinner />
        </span>
        Loading ...
      </div>
    );
  }

  const profileImage = session?.user?.image || "/User.webp";
  const userName = session?.user?.name || tokenDetails.name;
  const userEmail = session?.user?.email || tokenDetails.email;

  return (
    <div className=" w-full flex flex-row p-2">
      <div className=" w-auto rounded-full p-2">
        <Image
          src={profileImage}
          alt="Profile Image"
          width={100}
          height={100}
          className=" rounded-sm"
        />
      </div>
      <div className=" flex flex-col justify-end font-semibold p-5">
        <span>{session?.user.name || userName}</span>
        <span>{session?.user.email || userEmail}</span>
      </div>
    </div>
  );
};

export default Profile;
