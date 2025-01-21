import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthProvider } from "./AuthContext";

interface PlaylistContextProps {
  Playlists: Object;
  SetPlaylists: Dispatch<SetStateAction<Object>>;
  UpdatedPlaylist: Object;
  SetUpdatePlaylist: Dispatch<SetStateAction<boolean>>;
  IsNewPlaylistCreated: boolean;
  SetNewPlaylistCreated: Dispatch<SetStateAction<boolean>>;
  IsNewPlaylistFormOpen: boolean;
  SetNewPlaylistFormOpen: Dispatch<SetStateAction<boolean>>;
  IsAddToPlaylistDropupOpen: boolean;
  SetIsAddToPlaylistDropupOpen: Dispatch<SetStateAction<boolean>>;
}

const PlaylistContext = createContext<PlaylistContextProps | undefined>(
  undefined
);

interface PlaylistProps {
  children: ReactNode;
}

type PlaylistType = {
  id: string;
  title: string;
  description: string;
};

export const PlaylistContextProvider: React.FC<PlaylistProps> = ({
  children,
}) => {
  const [Playlists, SetPlaylists] = useState({});
  const [UpdatedPlaylist, SetUpdatePlaylist] = useState<boolean>(false);
  const [IsAddToPlaylistDropupOpen, SetIsAddToPlaylistDropupOpen] =
    useState(false);
  const [IsNewPlaylistFormOpen, SetNewPlaylistFormOpen] = useState(false);
  const [IsNewPlaylistCreated, SetNewPlaylistCreated] = useState(false);

  return (
    <PlaylistContext.Provider
      value={{
        Playlists,
        SetPlaylists,
        UpdatedPlaylist,
        SetUpdatePlaylist,
        IsNewPlaylistCreated,
        SetNewPlaylistCreated,
        IsNewPlaylistFormOpen,
        SetNewPlaylistFormOpen,
        IsAddToPlaylistDropupOpen,
        SetIsAddToPlaylistDropupOpen,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = (): PlaylistContextProps => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("Use Playlist Context has to bee used ");
  }
  return context;
};
