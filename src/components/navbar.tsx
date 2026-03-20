"use client";
import { CiSearch } from "react-icons/ci";
import { IoChevronBack, IoCloseOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTopSearches, searchAll } from "@/lib/api_jiosaavn";
import { AllSearch, TopSearch } from "@/types";
import { getHref, getImageURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { DropdownMenuProfile } from "./ui/ProfileDropDown";
import { useAuthProvider } from "@/context/AuthContext";
import LoadingSpinner from "./ui/LoadingSpinner";
import { PiListLight } from "react-icons/pi";
import Image from "next/image";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const Navbar = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [trendingSearches, setTrendingSearches] = useState<TopSearch[]>([]);
  const { isAuthenticated } = useAuthProvider();
  const router = useRouter();

  const openSearch = () => {
    setSearchOpen(true);
    setIsClosing(false);
  };

  const closeSearch = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSearchOpen(false);
      setIsClosing(false);
    }, 200);
  }, []);

  return (
    <>
      <div className="NavbarMain sticky top-0 bg-black z-50 flex items-center h-14 md:h-16 text-white rounded-t-lg max-w-full">
        <div className="cursor-pointer px-2 md:hidden">
          <PiListLight size={24} />
        </div>
        <div className="flex flex-row justify-between min-w-full gap-2">
          <div className="h-16 flex items-center justify-center w-full gap-3">
            <div className="md:h-[46px] h-[42px] md:w-[280px] w-full rounded-2xl flex flex-row items-center ml-6">
              <Image
                src="/EchoverseLogoFinal.png"
                width={184}
                height={32}
                alt="EchoVerse Logo"
                className="w-[184px]"
                priority
              />
            </div>
            <form className="md:h-16 h-12 flex items-center justify-start w-full">
              <div
                className="p-2 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <HomeRoundedIcon
                  fontSize="large"
                  style={{ color: "#7d7d7d" }}
                />
              </div>

              {/* Search trigger */}
              <div
                className="md:h-[46px] h-[42px] md:w-[480px] w-full rounded-full flex flex-row items-center bg-[#242424] hover:bg-[#2a2a2a] pl-4 transition-colors cursor-pointer"
                onClick={openSearch}
              >
                <CiSearch color="#b3b3b3" className="size-4 md:size-5" />
                <span className="text-[#b3b3b3] text-xs md:text-sm ml-3 font-normal">
                  What do you want to play?
                </span>
              </div>
            </form>
          </div>
          <div className="NavbarBarProfile flex items-center mr-5">
            <div className="w-10 md:mr-0 mr-5 cursor-pointer rounded-full flex justify-center items-center">
              {isAuthenticated ? (
                <DropdownMenuProfile />
              ) : (
                <MdAccountCircle
                  size={40}
                  onClick={() => router.push("/signin")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Search Overlay - portal-like, above everything */}
      {isSearchOpen && (
        <SearchOverlay
          isClosing={isClosing}
          closeSearch={closeSearch}
          trendingSearches={trendingSearches}
          setTrendingSearches={setTrendingSearches}
        />
      )}
    </>
  );
};

/* ─── Full Screen Search Overlay ─── */

type SearchOverlayProps = {
  isClosing: boolean;
  closeSearch: () => void;
  trendingSearches: TopSearch[];
  setTrendingSearches: React.Dispatch<React.SetStateAction<TopSearch[]>>;
};

function SearchOverlay({
  isClosing,
  closeSearch,
  trendingSearches,
  setTrendingSearches,
}: SearchOverlayProps) {
  const [inputData, setInputData] = useState("");
  const [searchData, setSearchData] = useState<AllSearch | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const searchHandler = async (value: string) => {
    if (!value.trim()) {
      setSearchData(undefined);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await searchAll(value);
    setSearchData(data);
    setIsLoading(false);
  };

  const timerRef = useRef<any>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputData(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => searchHandler(value), 500);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") event.stopPropagation();
    if (event.key === "Escape") closeSearch();
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (trendingSearches.length === 0) {
      getTopSearches().then((data) => {
        if (data) setTrendingSearches(data);
      });
    }
  }, []);

  // Close on clicking outside the overlay panel
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
      closeSearch();
    }
  };

  // Parse results
  const topResult =
    searchData?.top_query?.data?.[0] ||
    searchData?.songs?.data?.[0] ||
    searchData?.albums?.data?.[0] ||
    null;
  const songs = searchData?.songs?.data?.slice(0, 4) ?? [];
  const artists = searchData?.artists?.data?.slice(0, 6) ?? [];
  const albums = searchData?.albums?.data?.slice(0, 4) ?? [];
  const playlists = searchData?.playlists?.data?.slice(0, 3) ?? [];

  const hasResults =
    topResult || songs.length > 0 || artists.length > 0 || albums.length > 0;

  const getLink = (val: any) => getHref(val.url, val.type);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-start justify-center ${
        isClosing ? "search-backdrop-exit" : "search-backdrop-enter"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      onClick={handleBackdropClick}
    >
      {/* Overlay panel - constrained height */}
      <div
        ref={overlayRef}
        className={`w-full max-w-[680px] mt-[56px] md:mt-[64px] bg-[#1a1a1a] md:rounded-xl rounded-t-xl overflow-hidden flex flex-col shadow-2xl shadow-black/80 ${
          isClosing ? "search-overlay-exit" : "search-overlay-enter"
        }`}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#242424] flex-shrink-0">
          <button
            onClick={closeSearch}
            className="text-[#b3b3b3] hover:text-white transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <IoChevronBack size={22} />
          </button>
          <div className="flex-1 flex items-center bg-[#3a3a3a] rounded-full px-4 h-[42px]">
            <CiSearch color="#b3b3b3" size={18} className="flex-shrink-0" />
            <input
              ref={inputRef}
              placeholder="What do you want to play?"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={inputData}
              type="text"
              className="bg-transparent w-full text-white text-[15px] font-normal placeholder-[#7f7f7f] ml-3 outline-none"
            />
            {inputData && (
              <button
                onClick={() => {
                  setInputData("");
                  setSearchData(undefined);
                  inputRef.current?.focus();
                }}
                className="text-[#b3b3b3] hover:text-white transition-colors ml-2 flex-shrink-0"
              >
                <IoCloseOutline size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto custom-search-scroll px-5 py-4">
          {inputData === "" ? (
            <TrendingSection
              items={trendingSearches}
              getLink={getLink}
              closeSearch={closeSearch}
            />
          ) : isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : searchData && hasResults ? (
            <SearchResults
              topResult={topResult}
              songs={songs}
              artists={artists}
              albums={albums}
              playlists={playlists}
              getLink={getLink}
              closeSearch={closeSearch}
            />
          ) : searchData && !hasResults ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-white font-bold text-lg mb-1">
                No results found
              </p>
              <p className="text-[#a7a7a7] text-sm">
                for &quot;{inputData}&quot;
              </p>
            </div>
          ) : (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Trending Section ─── */

function TrendingSection({
  items,
  getLink,
  closeSearch,
}: {
  items: TopSearch[];
  getLink: (val: any) => string;
  closeSearch: () => void;
}) {
  return (
    <div>
      <h2 className="font-bold text-[18px] mb-4 text-white">
        Trending Searches
      </h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {items.map((val, idx) => {
            const imgUrl = getImageURL(val?.image);
            if (!imgUrl || !val?.name) return null;
            return (
              <Link
                className="flex gap-3 items-center hover:bg-[#ffffff10] rounded-md p-2 transition-colors"
                href={getLink(val)}
                key={idx}
                onClick={closeSearch}
              >
                <Image
                  src={imgUrl}
                  width={48}
                  height={48}
                  className="rounded w-[48px] h-[48px] object-cover flex-shrink-0"
                  alt={val.name}
                  quality={60}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-normal text-white truncate">
                    {val.name}
                  </span>
                  <span className="text-[12px] text-[#a7a7a7] first-letter:capitalize truncate">
                    {val.type}
                    {val.subtitle ? ` · ${val.subtitle}` : ""}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

/* ─── Search Results ─── */

function SearchResults({
  topResult,
  songs,
  artists,
  albums,
  playlists,
  getLink,
  closeSearch,
}: {
  topResult: any;
  songs: any[];
  artists: any[];
  albums: any[];
  playlists: any[];
  getLink: (val: any) => string;
  closeSearch: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Result + Songs side by side */}
      {(topResult || songs.length > 0) && (
        <div className="flex flex-col md:flex-row gap-5">
          {/* Top Result */}
          {topResult && (
            <div className="md:w-[45%] flex-shrink-0">
              <h2 className="font-bold text-[18px] mb-3 text-white">
                Top result
              </h2>
              <Link
                href={getLink(topResult)}
                onClick={closeSearch}
                className="block bg-[#ffffff08] hover:bg-[#ffffff14] rounded-lg p-5 transition-colors group relative"
              >
                <Image
                  src={getImageURL(topResult.image)}
                  width={92}
                  height={92}
                  className={`w-[92px] h-[92px] object-cover mb-4 shadow-lg shadow-black/50 ${
                    topResult.type === "artist" ? "rounded-full" : "rounded-md"
                  }`}
                  alt={topResult.name}
                  quality={75}
                />
                <p className="font-bold text-[22px] text-white truncate leading-tight">
                  {topResult.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {topResult.subtitle && (
                    <span className="text-[13px] text-[#a7a7a7] truncate max-w-[65%]">
                      {topResult.subtitle}
                    </span>
                  )}
                  <span className="text-[11px] text-white bg-[#ffffff1a] rounded-full px-2.5 py-[2px] font-semibold first-letter:capitalize flex-shrink-0">
                    {topResult.type}
                  </span>
                </div>
                {/* Play button */}
                <div className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-[#1ed760] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xl shadow-black/50 hover:scale-105 hover:bg-[#1fdf64]">
                  <FaPlay className="text-black text-[16px] ml-[2px]" />
                </div>
              </Link>
            </div>
          )}

          {/* Songs */}
          {songs.length > 0 && (
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-[18px] mb-3 text-white">Songs</h2>
              <div className="flex flex-col">
                {songs.map((song, idx) => (
                  <SongRow
                    key={idx}
                    item={song}
                    getLink={getLink}
                    closeSearch={closeSearch}
                    subtitle={
                      song.primary_artists || song.singers || song.subtitle
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Artists */}
      {artists.length > 0 && (
        <div>
          <h2 className="font-bold text-[18px] mb-3 text-white">Artists</h2>
          <div className="flex gap-2 flex-wrap">
            {artists.map((artist, idx) => {
              const imgUrl = getImageURL(artist?.image);
              if (!imgUrl || !artist?.name) return null;
              return (
                <Link
                  href={getLink(artist)}
                  key={idx}
                  onClick={closeSearch}
                  className="flex flex-col items-center gap-2 p-2.5 rounded-lg hover:bg-[#ffffff10] transition-colors w-[100px]"
                >
                  <Image
                    src={imgUrl}
                    width={80}
                    height={80}
                    className="rounded-full w-[80px] h-[80px] object-cover shadow-md shadow-black/30"
                    alt={artist.name}
                    quality={60}
                  />
                  <span className="text-[12px] font-medium text-white truncate w-full text-center">
                    {artist.name}
                  </span>
                  <span className="text-[11px] text-[#a7a7a7]">Artist</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Albums */}
      {albums.length > 0 && (
        <div>
          <h2 className="font-bold text-[18px] mb-3 text-white">Albums</h2>
          <div className="flex flex-col">
            {albums.map((album, idx) => (
              <SongRow
                key={idx}
                item={album}
                getLink={getLink}
                closeSearch={closeSearch}
                subtitle={`${album.year ? `${album.year} · ` : ""}${
                  album.music || album.subtitle
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Playlists */}
      {playlists.length > 0 && (
        <div>
          <h2 className="font-bold text-[18px] mb-3 text-white">Playlists</h2>
          <div className="flex flex-col">
            {playlists.map((pl, idx) => (
              <SongRow
                key={idx}
                item={pl}
                getLink={getLink}
                closeSearch={closeSearch}
                subtitle={`Playlist${pl.subtitle ? ` · ${pl.subtitle}` : ""}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Reusable Row Component ─── */

function SongRow({
  item,
  getLink,
  closeSearch,
  subtitle,
}: {
  item: any;
  getLink: (val: any) => string;
  closeSearch: () => void;
  subtitle: string;
}) {
  const imgUrl = getImageURL(item?.image);
  if (!imgUrl || !item?.name) return null;

  return (
    <Link
      href={getLink(item)}
      onClick={closeSearch}
      className="flex items-center gap-3 px-2 py-[7px] rounded-md hover:bg-[#ffffff10] transition-colors group"
    >
      <Image
        src={imgUrl}
        width={44}
        height={44}
        className={`w-[44px] h-[44px] object-cover flex-shrink-0 ${
          item.type === "artist" ? "rounded-full" : "rounded"
        }`}
        alt={item.name}
        quality={60}
      />
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[14px] font-normal text-white truncate group-hover:text-white">
          {item.name}
        </span>
        <span className="text-[12px] text-[#a7a7a7] truncate">{subtitle}</span>
      </div>
    </Link>
  );
}

export default Navbar;
