import TopArtistCard from "@/components/ui/Cards/topArtistCard";
import { getTopArtists } from "@/lib/api_jiosaavn";

const TopPlaylist = async () => {
  const playlistData = await getTopArtists();

  return (
    <div className="TopArtistPage grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {playlistData?.map(
        ({ id, name, image, url, follower_count, is_followed }, key) => {
          return (
            <div key={key}>
              <TopArtistCard
                key={key}
                id={id}
                name={name}
                image={image}
                url={url}
                follower_count={follower_count}
                is_followed={is_followed}
                type="artist"
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default TopPlaylist;
