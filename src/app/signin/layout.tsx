import React, { ReactNode } from "react";

interface SigninPageProp {
  children: ReactNode;
}

export default function SigninLayout({ children }: SigninPageProp) {
  return <div className=" bg-white w-full h-full">Hello{children}</div>;
}
