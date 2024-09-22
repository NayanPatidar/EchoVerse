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
  IsAddToPlaylistFormOpen: boolean;
  SetAddToPlaylistFormOpen: Dispatch<SetStateAction<boolean>>;
  PostSongForm: boolean;
  SetPostSongForm: Dispatch<SetStateAction<boolean>>;
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
  const [IsAddToPlaylistFormOpen, SetAddToPlaylistFormOpen] = useState(false);
  const [PostSongForm, SetPostSongForm] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        PostSongForm,
        SetPostSongForm,
        IsAddToPlaylistFormOpen,
        SetAddToPlaylistFormOpen,
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
