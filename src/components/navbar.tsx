"use client";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { getTopSearches, search, searchAll } from "@/lib/api_jiosaavn";
import { AllSearch, TopSearch } from "@/types";
import { getImageURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { useSidebar } from "@/context/SidebarContext";
import { DropdownMenuProfile } from "./ui/ProfileDropDown";
import { useSession, signIn } from "next-auth/react";
import { useAuthProvider } from "@/context/AuthContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import LoadingSpinner from "./ui/LoadingSpinner";
import { PiListLight } from "react-icons/pi";

const Navbar = () => {
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [trendingSearches, setTrendingSearches] = useState<TopSearch[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { sideBarOpen, toggleSideBar } = useSidebar();
  const { isAuthenticated } = useAuthProvider();
  const { SetPlay } = useAudioPlayer();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setSearchBarOpen(false);
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

  const Profile = () => {
    SetPlay((prev) => !prev);
    router.push("/signin");
  };

  const sidebarClass = sideBarOpen
    ? "NavbarMainOnSideBarOpen"
    : "NavbarMainOnSideBarClose";

  return (
    <div
      className={` NavbarMain ${sidebarClass} sticky top-0 bg-[#121212] z-50 flex items-center h-14 md:h-16 text-white rounded-t-lg max-w-full`}
    >
      <div className=" cursor-pointer px-2 md:hidden ">
        <PiListLight size={24} onClick={() => toggleSideBar()} />
      </div>
      <div className=" flex flex-row justify-between min-w-full gap-2">
        <div className=" border-white h-16 flex items-center w-full gap-3">
          <form className="md:h-16 h-12 md:pl-[48px] flex items-center w-full">
            <div
              ref={searchBarRef}
              className=" md:h-[42px] h-[38px] z-50 border-[1px] border-zinc-600 md:w-[480px] w-full rounded-md flex flex-row items-center bg-[#242424] pl-4"
            >
              <CiSearch color="zinc" className=" size-4 md:size-6" />
              <Input
                readOnly
                placeholder="Search songs, albums, artists, podcasts"
                className="bg-[#242424] md:h-[40px] h-[36px]  flex-grow border-none rounded-lg placeholder-[#535353] cursor-pointer w-full placeholder:text-xs md:placeholder:text-sm"
                onClick={() => setSearchBarOpen(true)}
              />
              {isSearchBarOpen ? (
                <SearchBarBox
                  trendingSearches={trendingSearches}
                  closeSearchBar={() => setSearchBarOpen(false)}
                />
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
        <div className="NavbarBarProfile flex items-center mr-5">
          <div className=" w-10  md:mr-0 mr-5 cursor-pointer rounded-full z-[100] flex justify-center items-center">
            {isAuthenticated ? (
              <DropdownMenuProfile />
            ) : (
              <MdAccountCircle size={40} onClick={() => Profile()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type SearchBarBoxProps = {
  trendingSearches: TopSearch[];
  closeSearchBar: () => void;
};

function SearchBarBox({ trendingSearches, closeSearchBar }: SearchBarBoxProps) {
  const [inputData, setInputData] = useState("");
  const [SearchData, setSearchData] = useState<AllSearch>();
  const router = useRouter();

  const searchHandler = async (e: any) => {
    setInputData(e.target.value);
    const data = await searchAll(e.target.value);
    setSearchData(data);
  };

  const debounce = (cb: Function, delay: number) => {
    let timer: any;
    return (e: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = cb(e);
      }, delay);
    };
  };

  const OpenSong = (val: any) => {
    if (val.type == "artist") {
      router.replace(`/artist/${val.name}/${val.id}`);
    } else if (val.type == "album") {
      router.replace(`/album/${val.name}/${val.id}`);
    } else if (val.type == "song") {
      router.replace(`/song/${val.name}/${val.id}`);
    }

    closeSearchBar();
  };

  const handleSearchBarKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === " ") {
      event.stopPropagation();
    }
  };

  const searchProcess = debounce(searchHandler, 1000);
  const processedItems = new Set();

  return (
    <div className=" absolute SearchBoxMain w-[90%] h-auto bg-[#242424] left-[48px] top-[11px] rounded-lg">
      <div className=" z-[150] border-[1px] border-zinc-600  w-full rounded-md flex flex-row items-center bg-[#242424] pl-4">
        <CiSearch color="zinc" size={24} />
        <Input
          autoFocus
          placeholder="Search ..."
          onChange={searchProcess}
          className="bg-[#242424] border-none w-full rounded-lg placeholder-[#535353] cursor-pointer"
          onKeyDown={handleSearchBarKeyDown}
          type="text"
        />
      </div>
      <div className=" p-5 ">
        {inputData == "" ? (
          <div>
            <span className=" Montserrat-bold">Trending Searches</span>
            <div className=" grid grid-cols-3 text-xs Montserrat-regular gap-3 mt-5">
              {Object.entries(trendingSearches).map(([key, val]) => {
                const TrendingSong = getImageURL(val?.image);
                return (
                  <div
                    className=" flex gap-2 items-center hover:bg-[#3b3b3b] rounded-md"
                    onClick={() => OpenSong(val)}
                    key={key}
                  >
                    <img
                      src={TrendingSong}
                      width={50}
                      height={50}
                      className=" rounded-md p-1"
                    />
                    <div className=" flex flex-col gap-[1px]">
                      <span className=" text-sm cursor-pointer">
                        {val.name}
                      </span>
                      <span className=" first-letter:capitalize cursor-pointer">
                        {val.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : SearchData ? (
          <div className="flex flex-row gap-2">
            {Object.entries(SearchData).map(([key, value]) => {
              if (value.data.length == 0) {
                return;
              }
              const identifier = `${value.data[0].type}`;

              if (!processedItems.has(identifier)) {
                processedItems.add(identifier);
                return (
                  <>
                    {value.data[0].type === "song" ||
                    value.data[0].type === "artist" ||
                    value.data[0].type === "album" ? (
                      <div className="Montserrat-regular flex flex-col gap-1 w-1/3">
                        <span className=" pb-1 mb-2 border-b-[1px] text-[#bababa] first-letter:capitalize">
                          {value.data[0].type}
                        </span>
                        {value.data.map((value, key) => {
                          const SearchSong = getImageURL(value?.image);
                          return (
                            <div
                              className=" flex gap-2  cursor-pointer hover:bg-[#ffffff45] rounded-md"
                              onClick={() => OpenSong(value)}
                              key={key}
                            >
                              <img
                                src={SearchSong}
                                width={50}
                                height={50}
                                className=" rounded-md p-1"
                              />
                              <div className="  text-sm flex flex-col justify-center  overflow-hidden whitespace-nowrap text-ellipsis">
                                <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                                  {value.name}
                                </span>
                                <span className="  overflow-hidden whitespace-nowrap text-ellipsis text-xs">
                                  {value.subtitle}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              }
            })}
          </div>
        ) : (
          <div className=" flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
