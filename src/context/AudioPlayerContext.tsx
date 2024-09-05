"use client";
import { Episode, Song } from "@/types";
import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AudioDetails {
  AudioFileLink: (Song | Episode)[] | undefined;
  CurrentAudioIndex: number;
  Duration: number;
  SetDuration: Dispatch<SetStateAction<number>>;
  SetAudioFileLink: Dispatch<SetStateAction<(Song | Episode)[] | undefined>>;
  SetCurrentAudioIndex: Dispatch<SetStateAction<number>>;
}
const AudioContext = createContext<AudioDetails | undefined>(undefined);

interface AudioPlayerProps {
  children: ReactNode;
}

type AudioFile = {
  URL: string;
  DURATION: number;
};

export const AudioPlayerProvider: React.FC<AudioPlayerProps> = ({
  children,
}) => {
  const [AudioFileLink, SetAudioFileLink] = useState<
    (Song | Episode)[] | undefined
  >(undefined);
  const [Duration, SetDuration] = useState<number>(0);
  const [CurrentAudioIndex, SetCurrentAudioIndex] = useState(0);

  return (
    <AudioContext.Provider
      value={{
        AudioFileLink,
        SetAudioFileLink,
        Duration,
        SetDuration,
        CurrentAudioIndex,
        SetCurrentAudioIndex,
      }}
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
