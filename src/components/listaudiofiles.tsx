import { SongObj } from "@/types";
import React from "react";

interface AudioFiles {
  SongsData?: SongObj;
}

const ListAudioFiles: React.FC<AudioFiles> = ({ SongsData }) => {
  console.log(SongsData);

  return <div></div>;
};
export default ListAudioFiles;
