import { getTopPlaylists } from "@/lib/api_jiosaavn";

const TopPlaylistPage = async () => {
  const topPlaylistData = await getTopPlaylists();
  console.log(topPlaylistData);

  return <div></div>;
};

export default TopPlaylistPage;
