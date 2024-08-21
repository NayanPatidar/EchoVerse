import { toggleButtonClasses } from "@mui/material";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isSidebarOpen, setSideBarOpen] = useState<boolean>(true);
  const toggleSideBar = () => setSideBarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Use Sidebar has to bee used in the Sidebar Provider");
  }
  return context;
};