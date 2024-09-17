'use server'
import TopPlaylistCard from "@/components/ui/Cards/playlistCard";
import { getTopPlaylists } from "@/lib/api_jiosaavn";

const TopPlaylistPage = async () => {
  const topPlaylistData = await getTopPlaylists();
  return (
    <div className="TopArtistPage grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {topPlaylistData?.data.map(
        ({ id, name, url, image, subtitle, type, explicit }, key) => {
          return (
            <div key={key}>
              <TopPlaylistCard
                key={key}
                id={id}
                name={name}
                url={url}
                subtitle={subtitle}
                type={type}
                image={image}
                explicit={explicit}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default TopPlaylistPage;
