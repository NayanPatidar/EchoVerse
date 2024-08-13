"use client";
import { PiListLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { getTopSearches } from "@/lib/api_jiosaavn";
import { TopSearch } from "@/types";
import { getImageURL } from "@/lib/utils";

const Navbar = () => {
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [trendingSearches, setTrendingSearches] = useState<TopSearch[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        console.log("Closing the Drop Down");
        setSearchBarOpen(false);
      } else {
        console.log("Not Closing the Drop Down");
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const FetchTrendingData = async () => {
      const TrendingSearches = await getTopSearches();
      if (TrendingSearches) {
        setTrendingSearches(TrendingSearches);
      }
    };

    FetchTrendingData();
  }, []);

  return (
    <div className="NavbarMain sticky top-0 bg-[#121212] z-50 flex h-auto text-white rounded-t-lg ">
      <div className=" border-white h-16 flex items-center ">
        <form className="h-16 pl-[48px] flex items-center">
          <div
            ref={searchBarRef}
            className=" z-50 border-[1px] border-zinc-600  w-[480px] rounded-md flex flex-row items-center bg-[#242424] pl-4"
          >
            <CiSearch color="zinc" size={24} />
            <Input
              readOnly
              placeholder="Search songs, albums, artists, podcasts"
              className="bg-[#242424] border-none w-[440px] rounded-lg placeholder-[#535353] cursor-pointer"
              onClick={() => setSearchBarOpen(true)}
            />
            {isSearchBarOpen ? (
              <SearchBarBox trendingSearches={trendingSearches} />
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

type TrendingSearchesProps = {
  trendingSearches: TopSearch[];
};

function SearchBarBox(TrendingSearches: TrendingSearchesProps) {
  return (
    <div className=" absolute SearchBoxMain w-[90%] h-auto bg-[#242424] left-1/2 right-1/2 -translate-x-1/2 top-[11px] rounded-lg">
      <div className=" z-50 border-[1px] border-zinc-400  w-full rounded-md flex flex-row items-center bg-[#242424] pl-4">
        <CiSearch color="zinc" size={24} />
        <Input
          autoFocus
          placeholder="Search ..."
          className="bg-[#242424] border-none w-full rounded-lg placeholder-[#535353] cursor-pointer"
        />
      </div>
      <div className=" p-5 ">
        <span className=" Montserrat-bold">Trending Searches</span>
        <div className=" grid grid-cols-3 text-xs Montserrat-regular gap-3 mt-5">
          {Object.entries(TrendingSearches.trendingSearches).map(
            ([key, val]) => {
              const TrendingSong = getImageURL(val?.image);
              return (
                <div className=" flex gap-2 items-center hover:bg-[#3b3b3b] rounded-md">
                  <img
                    src={TrendingSong}
                    width={50}
                    height={50}
                    className=" rounded-md p-1"
                  />
                  <div className=" flex flex-col gap-[1px]">
                    <span className=" text-sm cursor-pointer">{val.name}</span>
                    <span className=" first-letter:capitalize cursor-pointer">
                      {val.type}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
