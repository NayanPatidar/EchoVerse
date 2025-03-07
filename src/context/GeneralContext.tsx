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
  IsUploadPostFormOpen: boolean;
  SetUploadPostFormOpen: Dispatch<SetStateAction<boolean>>;
  NewMessage: boolean;
  SetNewMessage: Dispatch<SetStateAction<boolean>>;
  colorPalette: string;
  setColorPalette: Dispatch<SetStateAction<string>>;
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
  const [IsUploadPostFormOpen, SetUploadPostFormOpen] = useState(false);
  const [PostSongForm, SetPostSongForm] = useState(false);
  const [NewMessage, SetNewMessage] = useState(false);
  const [colorPalette, setColorPalette] = useState("#000000");

  return (
    <GeneralContext.Provider
      value={{
        PostSongForm,
        SetPostSongForm,
        IsAddToPlaylistFormOpen,
        SetAddToPlaylistFormOpen,
        IsUploadPostFormOpen,
        SetUploadPostFormOpen,
        NewMessage,
        SetNewMessage,
        colorPalette,
        setColorPalette,
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
