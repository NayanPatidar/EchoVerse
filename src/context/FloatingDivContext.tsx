"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FloatingDiv {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FloatDivContext = createContext<FloatingDiv | undefined>(undefined);

interface FloatProps {
  children: ReactNode;
}

export const FloatingDivProvider: React.FC<FloatProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <FloatDivContext.Provider value={{ open, setOpen }}>
      {children}
    </FloatDivContext.Provider>
  );
};

export const useFloatingDiv = (): FloatingDiv => {
  const context = useContext(FloatDivContext);
  if (!context) {
    throw new Error(
      "Use Floating Div has to bee used in the Floating Div Provider"
    );
  }
  return context;
};
