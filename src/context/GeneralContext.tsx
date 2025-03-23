"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
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
  primaryAccentColor: string;
  setPrimaryAccentColor: Dispatch<SetStateAction<string>>;
  secondaryAccentColor: string;
  setSecondaryAccentColor: Dispatch<SetStateAction<string>>;
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

  const [primaryAccentColor, setPrimaryAccentColor] = useState("#9c9c9c88");
  const [secondaryAccentColor, setSecondaryAccentColor] = useState("#9c9c9c88");

  useEffect(() => {
    const stored = localStorage.getItem("primaryAccentColor");
    if (stored) setPrimaryAccentColor(stored);
  }, []);

  useEffect(() => {
    if (primaryAccentColor) {
      localStorage.setItem("primaryAccentColor", primaryAccentColor);
    }
  }, [primaryAccentColor]);

  useEffect(() => {
    const stored = localStorage.getItem("secondaryAccentColor");
    if (stored) setSecondaryAccentColor(stored);
  }, []);

  useEffect(() => {
    if (secondaryAccentColor) {
      localStorage.setItem("secondaryAccentColor", secondaryAccentColor);
    }
  }, [secondaryAccentColor]);

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
        primaryAccentColor,
        setPrimaryAccentColor,
        secondaryAccentColor,
        setSecondaryAccentColor,
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
      "useGeneralContext must be used within a GeneralContextProvider"
    );
  }
  return context;
};
