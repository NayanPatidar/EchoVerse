"use client";
import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AudioDetails {
  AudioFileLink: string;
  Duration: number;
  SetDuration: Dispatch<SetStateAction<number>>;
  SetAudioFileLink: Dispatch<SetStateAction<string>>;
}
const AudioContext = createContext<AudioDetails | undefined>(undefined);

interface AudioPlayerProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProps> = ({
  children,
}) => {
  const [AudioFileLink, SetAudioFileLink] = useState<string>("");
  const [Duration, SetDuration] = useState<number>(0);

  return (
    <AudioContext.Provider
      value={{ AudioFileLink, SetAudioFileLink, Duration, SetDuration }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = (): AudioDetails => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "Use Audio Player has to bee used in the AudioPlayer Provider"
    );
  }
  return context;
};
