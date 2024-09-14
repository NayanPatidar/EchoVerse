"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { date } from "zod";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") return <div>Loading ...</div>;

  if (!session) {
    router.push("/");
  }

  return (
    <div className=" w-full flex flex-row p-2">
      <div className=" w-auto rounded-full p-2">
        <Image
          src={session?.user.image as string}
          alt="Profile Image"
          width={100}
          height={100}
          className=" rounded-sm border border-[#f0f0f0d3]"
        />
      </div>
      <div className=" flex flex-col justify-end font-semibold p-5">
        <span>{session?.user.name}</span>
        <span>{session?.user.email}</span>
      </div>
    </div>
  );
};

export default Profile;
