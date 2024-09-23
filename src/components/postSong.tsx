"use client";
import { Send, Underline } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cross } from "lucide-react";
import { useAuthProvider } from "@/context/AuthContext";
import { title } from "process";
import { useGeneralContext } from "@/context/GeneralContext";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { searchAll } from "@/lib/api_jiosaavn";
import { AllSearch, Song, TopSearch } from "@/types";
import { CiSearch } from "react-icons/ci";
import { getImageURL } from "@/lib/utils";

const PostSong = () => {
  const { SetPostSongForm, SetUploadPostFormOpen } = useGeneralContext();
  return (
    <div className=" w-full rounded-md flex-col justify-center items-center">
      <Button
        className=" flex gap-2 w-full bg-[#202020] hover:bg-[#393939] hover:text-white"
        onClick={() => {
          SetPostSongForm(true), SetUploadPostFormOpen(true);
        }}
      >
        <Send size={16} />
        Post Song
      </Button>
    </div>
  );
};

const postSchema = z.object({
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, {
      message: "Image is required.",
    }),
  description: z.string().min(1, { message: "Description is required." }),
  location: z.string().optional(),
  song: z.string().min(1, { message: "Song is required." }),
});

export function PostUploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [song, setSong] = useState("");
  const [songData, setSongData] = useState<Song | undefined>(undefined);
  const [SearchData, setSearchData] = useState<AllSearch>();
  const { SetUploadPostFormOpen, SetPostSongForm } = useGeneralContext();
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const SelectSong = (data: Song) => {
    setIsVisible(false);
    setSongData(data);
    setSong(data.name);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ image, description, location, song });
    setImage(null);
    setDescription("");
    setLocation("");
    setSong("");
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

  const handleSearchBarKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === " ") {
      event.stopPropagation();
    }
  };

  const searchHandler = async (e: any) => {
    const query = e.target.value;
    if (query.trim()) {
      const data = await searchAll(query);
      setSearchData(data);
    } else {
      setSearchData(undefined);
    }
  };

  const searchProcess = useCallback(debounce(searchHandler, 800), []);

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute w-[45rem] h-auto z-[400] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%]  p-2 bg-[#0b0b0b] rounded-md px-5  space-y-6 shadow-md
      border-white border "
    >
      <div className=" flex">
        <h2 className=" font-semibold text-xl text-center w-full pt-2 text-white">
          Upload a Post
        </h2>
        <div
          className=" flex items-center justify-center cursor-pointer"
          onClick={() => {
            SetPostSongForm(false), SetUploadPostFormOpen(false);
          }}
        >
          <Cross className=" rotate-45" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          placeholder="Write a caption for your post..."
          className=" text-black"
          data-gramm="false"
        />
      </div>

      <div className="space-y-2 z-[450] text-black relative" ref={wrapperRef}>
        <Label htmlFor="song" className=" text-white">
          Select Song
        </Label>
        {songData ? (
          <div></div>
        ) : (
          <Input
            id="song"
            value={song}
            onChange={(e) => {
              setSong(e.target.value);
              searchProcess(e);
            }}
            onKeyDown={handleSearchBarKeyDown}
            placeholder="Choose a song"
            className="text-black"
            type="text"
            onClick={() => {
              setIsVisible(true);
            }}
          />
        )}

        {isVisible && (
          <div className=" w-full">
            <SearchBarBox
              SearchData={SearchData as AllSearch}
              SelectSong={SelectSong}
            />
          </div>
        )}
      </div>

      <div className=" flex gap-5">
        <div className="space-y-2 w-full flex flex-col pt-[9px]">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image"
            className="cursor-pointer px-3 py-[10px] text-sm font-medium border border-gray-300 rounded-md text-gray-700 bg-gray-100"
          >
            {image ? image.name : "Choose File"}
          </label>
        </div>

        <div className="space-y-2 w-full ">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add location"
          />
        </div>
      </div>

      <div className=" flex justify-center w-full">
        <Button type="submit" className="w-2/5 ">
          Upload Post
        </Button>
      </div>
    </form>
  );
}

export default PostSong;

type SearchBarBoxProps = {
  SearchData: AllSearch;
  SelectSong: (data: Song) => void;
};

function SearchBarBox({ SearchData, SelectSong }: SearchBarBoxProps) {
  const processedItems = new Set();

  return (
    <div className=" absolute z-[100] border bg-[#efefef] h-25 w-full rounded-lg">
      <div className=" p-5 ">
        {SearchData ? (
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
                    {value.data[0].type === "song" ? (
                      <div className="Montserrat-regular grid grid-cols-3 gap-1">
                        {value.data.map((value: any) => {
                          const SearchSong = getImageURL(value?.image);
                          return (
                            <div
                              className=" flex gap-2  cursor-pointer hover:bg-[#2f2f2f45] rounded-md"
                              onClick={() => SelectSong(value)}
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
          <div className=" h-12 text-sm  flex items w-full items-center justify-center text-center">
            "Search Songs To Add to your Post"
          </div>
        )}
      </div>
    </div>
  );
}
