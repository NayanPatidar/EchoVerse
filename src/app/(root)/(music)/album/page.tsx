"use server";
import TopPlaylistCard from "@/components/ui/Cards/playlistCard";
import TopArtistCard from "@/components/ui/Cards/topArtistCard";
import { getTopAlbums, getTopArtists } from "@/lib/api_jiosaavn";

const TopAlbums = async () => {
  const albumData = await getTopAlbums();

  return (
    <div>
      <div className=" md:py-3 md:pt-2 py-2 text-base md:text-lg lg:text-2xl first-letter:capitalize Montserrat-bold md:pl-5 pl-3 cursor-default">
        Top Albums
      </div>
      <div className="TopArtistPage grid md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] grid-cols-[repeat(auto-fit,minmax(110px,1fr))] md:gap-4 w-full">
        {albumData?.data?.map(({ id, name, image, url }, key) => {
          return (
            <div key={key} className=" w-[110px]">
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
    </div>
  );
};

export default TopAlbums;
