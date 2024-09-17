'use server'
import TopPlaylistCard from "@/components/ui/Cards/playlistCard";
import TopArtistCard from "@/components/ui/Cards/topArtistCard";
import { getTopAlbums, getTopArtists } from "@/lib/api_jiosaavn";

const TopAlbums = async () => {
  const albumData = await getTopAlbums();

  return (
    <div className="TopArtistPage grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {albumData?.data?.map(({ id, name, image, url }, key) => {
        return (
          <div key={key}>
            <TopPlaylistCard
              key={key}
              id={id}
              name={name}
              image={image}
              url={url}
              type="album"
            />
          </div>
        );
      })}
    </div>
  );
};

export default TopAlbums;
