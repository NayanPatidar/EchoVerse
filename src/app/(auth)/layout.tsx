import React, { ReactNode } from "react";

interface SigninPageProp {
  children: ReactNode;
}

export default function SigninLayout({ children }: SigninPageProp) {
  return (
    <div className="w-full h-screen bg-[#0b0b0b] flex justify-center items-center align-middle">
      {children}
    </div>
  );
}
