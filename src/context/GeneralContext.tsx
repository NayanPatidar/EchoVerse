"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GeneralContextInterface {
  open: boolean;
  createPlaylist: boolean;
  SaveToPlaylist: boolean;
  SetSaveToPlaylist: Dispatch<SetStateAction<boolean>>;
  setCreatePlaylist: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const GeneralContext = createContext<GeneralContextInterface | undefined>(
  undefined
);

interface GeneralProps {
  children: ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [SaveToPlaylist, SetSaveToPlaylist] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        open,
        setOpen,
        createPlaylist,
        setCreatePlaylist,
        SaveToPlaylist,
        SetSaveToPlaylist,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = (): GeneralContextInterface => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error(
      "Use Floating Div has to bee used in the Floating Div Provider"
    );
  }
  return context;
};
