"use server";
import TopPlaylistCard from "@/components/ui/Cards/playlistCard";
import { getTopPlaylists } from "@/lib/api_jiosaavn";

const TopPlaylistPage = async () => {
  const topPlaylistData = await getTopPlaylists();
  return (
    <div className=" m-4">
      <div className=" md:py-3 md:pt-2 py-2 text-base md:text-lg lg:text-2xl first-letter:capitalize Montserrat-bold md:pl-5 pl-3 cursor-default">
        Top Playlists
      </div>
      <div className="TopArtistPage grid md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] grid-cols-[repeat(auto-fit,minmax(110px,1fr))] md:gap-2 w-full">
        {topPlaylistData?.data.map(
          ({ id, name, url, image, subtitle, type, explicit }, key) => {
            return (
              <div key={key} className="">
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
    </div>
  );
};

export default TopPlaylistPage;
