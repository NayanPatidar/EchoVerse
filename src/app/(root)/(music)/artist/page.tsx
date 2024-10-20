"use server";
import TopArtistCard from "@/components/ui/Cards/topArtistCard";
import { getTopArtists } from "@/lib/api_jiosaavn";

const TopPlaylist = async () => {
  const playlistData = await getTopArtists();

  return (
    <div>
      <div className=" md:py-3 md:pt-2 py-2 text-base md:text-lg lg:text-2xl first-letter:capitalize Montserrat-bold md:pl-5 pl-3 cursor-default">
        Top Artists
      </div>
      <div className="TopArtistPage grid md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:gap-4 w-full">
        {playlistData?.map(
          ({ id, name, image, url, follower_count, is_followed }, key) => {
            return (
              <div key={key} className=" w-[100px]">
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
    </div>
  );
};

export default TopPlaylist;
