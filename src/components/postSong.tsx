"use client";
import { Send } from "lucide-react";
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
import { useState } from "react";
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
import { AllSearch, TopSearch } from "@/types";
import { CiSearch } from "react-icons/ci";

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
  const [SearchData, setSearchData] = useState<AllSearch>();
  const { SetUploadPostFormOpen, SetPostSongForm } = useGeneralContext();

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
    setSong(e.target.value);
    const data = await searchAll(e.target.value);
    setSearchData(data);
  };

  const searchProcess = debounce(searchHandler, 1000);

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

      <div className="space-y-2 z-[450] text-black">
        <Label htmlFor="song" className=" text-white">
          Select Song
        </Label>
        <Input
          id="song"
          value={song}
          onChange={searchProcess}
          onKeyDown={handleSearchBarKeyDown}
          placeholder="Choose a song"
          className="text-black"
          type="text"
        />
      </div>

      <div className=" flex  gap-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="space-y-2 w-full">
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
  SearchData: Object;
  closeSearchBar: () => void;
};

function SearchBarBox({ SearchData, closeSearchBar }: SearchBarBoxProps) {
  const SearchColums = ["Albums", "Songs", "Artists"];

  const processedItems = new Set();

  return (
    <div className=" absolute SearchBoxMain w-[90%] h-auto bg-[#242424] left-[48px] top-[11px] rounded-lg">
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
                    {value.data[0].type === "song" ||
                    value.data[0].type === "artist" ||
                    value.data[0].type === "album" ? (
                      <div className="Montserrat-regular flex flex-col gap-1 w-1/3">
                        <span className=" pb-1 mb-2 border-b-[1px] text-[#bababa] first-letter:capitalize">
                          {value.data[0].type}
                        </span>
                        {value.data.map((value: any) => {
                          const SearchSong = getImageURL(value?.image);
                          return (
                            <div className=" flex gap-2  cursor-pointer hover:bg-[#ffffff45] rounded-md">
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
          ""
        )}
      </div>
    </div>
  );
}
