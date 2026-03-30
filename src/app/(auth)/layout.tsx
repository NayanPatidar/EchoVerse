import React, { ReactNode } from "react";

interface SigninPageProp {
  children: ReactNode;
}

export default function SigninLayout({ children }: SigninPageProp) {
  return (
    <div className="w-full h-screen flex justify-center items-center"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, #0b0b0b 70%)",
      }}
    >
      {children}
    </div>
  );
}
