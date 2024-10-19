"use client";
import { CrossIcon, Send, Underline } from "lucide-react";
import { z } from "zod";
import { Cross } from "lucide-react";
import { useGeneralContext } from "@/context/GeneralContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getSongDetails, searchAll } from "@/lib/api_jiosaavn";
import { AllSearch, Song, TopSearch } from "@/types";
import { getImageURL } from "@/lib/utils";
import { IoCloseSharp } from "react-icons/io5";
import Mirt from "./external/Mirt";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuthProvider } from "@/context/AuthContext";
import Image from "next/image";

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

export default PostSong;

const postSchemaPage1 = z.object({
  description: z.string().min(1, { message: "Description is required." }),
});

const postSchemaPage2 = z.object({
  imageOrVideo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, {
      message: "Image / Video is required.",
    }),
  songData: z.object({}),
  location: z.string().optional(),
});

const postSchemaPage3 = z.object({
  imageOrVideo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, {
      message: "Image / Video is required.",
    }),
  location: z.string().optional(),
});

export function PostUploadForm() {
  const [imageOrVideo, setImageOrVideo] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [song, setSong] = useState("");
  const [songData, setSongData] = useState<Song | undefined>(undefined);
  const [SearchData, setSearchData] = useState<AllSearch>();
  const { SetUploadPostFormOpen, SetPostSongForm } = useGeneralContext();
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [page, SetPage] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [initialVal, setInitialVal] = useState<string>("0");
  const [finalVal, setFinalVal] = useState<string>("0");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [SongLink, setSongLink] = useState<string>("");
  const { token } = useAuthProvider();
  const [playing, setPlaying] = useState<boolean>(false);
  type PostType = "photo" | "video";
  const [postType, setPostType] = useState<PostType>("photo");

  const [errors, setErrors] = useState({
    description: "",
    songData: "",
    imageOrVideo: " ",
  });

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
    console.log(file);
    setImageOrVideo(file);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (page == 1) {
      const formData = {
        description,
      };
      const result = postSchemaPage1.safeParse(formData);

      if (!result.success) {
        const errors = result.error.format();
        setErrors({
          description: errors.description?._errors[0] || "",
          songData: "",
          imageOrVideo: "",
        });
        return;
      } else {
        SetPage(postType == "photo" ? 2 : 3);
      }
    } else if (page == 2) {
      const formData = {
        imageOrVideo,
        location,
        songData,
      };

      const result = postSchemaPage2.safeParse(formData);

      if (!result.success) {
        const errors = result.error.format();
        setErrors({
          description: "",
          songData: errors.songData?._errors[0] || "",
          imageOrVideo: errors.imageOrVideo?._errors[0] || "",
        });
        console.log(errors);
        return;
      } else {
        SetPage(4);
      }
    } else if (page == 3) {
      const formData = {
        imageOrVideo,
        location,
      };

      const result = postSchemaPage3.safeParse(formData);

      if (!result.success) {
        const errors = result.error.format();
        setErrors({
          description: "",
          imageOrVideo: errors.imageOrVideo?._errors[0] || "",
          songData: "",
        });
        console.log(errors);
        return;
      } else {
        uploadPost();
      }
    } else {
      uploadPost();
    }
  };

  const uploadPost = () => {
    if (!imageOrVideo) return;
    if (isUploading) return;

    setIsUploading(true);
    const uniqueFileName = `${uuidv4()}.${imageOrVideo.name.split(".").pop()}`;
    const storageRef = ref(storage, `uploads/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageOrVideo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadToDB(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  const uploadToDB = async (downloadurl: string) => {
    if (!downloadurl) {
      console.log("Download URL Not Found !!");
      return;
    }

    try {
      const response = await fetch("/api/posts/upload/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Description: description,
          AudioStartTime: initialVal,
          AudioEndTime: finalVal,
          ImageDownloadLink: downloadurl,
          Location: location,
          AudioLink: SongLink,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to upload post: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Post uploaded successfully:", data);
      closeForm();
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const setErrorToNull = () => {
    setErrors({
      description: "",
      songData: "",
      imageOrVideo: "",
    });
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

  const closeForm = () => {
    setPlaying((prev) => !prev);
    setImageOrVideo(null);
    setDescription("");
    setLocation("");
    setSong("");
    SetPostSongForm(false), SetUploadPostFormOpen(false), setErrorToNull();
  };

  const handleFileDownload = async (url: string): Promise<File | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "downloadedFile.mp3", { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error downloading file:", error);
      return null;
    }
  };

  const handleFileFetch = async () => {
    if (songData) {
      const song = await getSongDetails(songData?.id as string);
      setSongLink(song?.songs[0].download_url[2].link as string);
      const fetchedFile = await handleFileDownload(
        song?.songs[0].download_url[2].link as string
      );
      setFile(fetchedFile);
    }
  };

  const TrimmerValueOnChange = ({
    start,
    current,
    end,
  }: {
    start: number;
    current: number;
    end: number;
  }) => {
    setInitialVal(convertSecondsToMinutes(start));
    setFinalVal(convertSecondsToMinutes(end));
  };

  function convertSecondsToMinutes(milliseconds: number) {
    const seconds = milliseconds / 1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds}`;
  }

  useEffect(() => {
    handleFileFetch();
  }, [songData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute w-[45rem] h-auto z-[400] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%]  p-2 bg-[#0b0b0b] rounded-md px-5  space-y-6 shadow-md
      border-white border "
    >
      {page == 1 ? (
        <>
          <div className=" flex">
            <h2 className=" font-semibold text-xl text-center w-full pt-2 text-white">
              Upload a Post
            </h2>
            <div
              className=" flex items-center justify-center cursor-pointer"
              onClick={() => closeForm()}
            >
              <Cross className=" rotate-45" />
            </div>
          </div>
          <div className="space-y-2">
            <div className=" flex  w-full">
              <Label
                htmlFor="description"
                className=" flex gap-2  w-full items-center"
              >
                Description
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </Label>
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e: any) => {
                setDescription(e.target.value);
                setErrorToNull();
              }}
              placeholder="Write a caption for your post..."
              className=" text-black"
              data-gramm="false"
              autoComplete="off"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <label className=" flex gap-1">
              <input
                type="radio"
                value="photo"
                checked={postType === "photo"}
                onChange={() => setPostType("photo")}
              />
              Photo
            </label>
            <label className=" flex gap-1">
              <input
                type="radio"
                value="video"
                checked={postType === "video"}
                onChange={() => setPostType("video")}
              />
              Video
            </label>
          </div>
        </>
      ) : (
        ""
      )}

      {page == 2 && postType == "photo" ? (
        <>
          <div className=" flex">
            <h2 className=" font-semibold text-xl text-center w-full pt-2 text-white">
              Select Photo
            </h2>
            <div
              className=" flex items-center justify-center cursor-pointer"
              onClick={() => closeForm()}
            >
              <Cross className=" rotate-45" />
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <div
              className="space-y-2 z-[450] text-black relative"
              ref={wrapperRef}
            >
              <Label
                htmlFor="song"
                className=" text-white flex gap-2 items-center"
              >
                Select Song
                {errors.songData && (
                  <p className="text-red-500 text-sm items-center flex">
                    {errors.songData}
                  </p>
                )}
              </Label>
              {songData ? (
                <div className=" w-full h-12 bg-white rounded-lg p-1">
                  <div className=" flex gap-2 w-fit cursor-pointer hover:bg-[#2f2f2f45] rounded-md items-center pr-1">
                    <Image
                      src={getImageURL(songData.image)}
                      width={40}
                      height={40}
                      className=" rounded-lg p-1"
                      alt="Song Icon"
                    />
                    <div className="  text-sm flex flex-col justify-center  overflow-hidden whitespace-nowrap text-ellipsis">
                      <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                        {songData.name}
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setSong(""), setErrorToNull(), setSongData(undefined);
                      }}
                    >
                      <IoCloseSharp />
                    </div>
                  </div>
                </div>
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
                  autoComplete="off"
                  onClick={() => {
                    setIsVisible(true);
                    setErrorToNull();
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
                <Label
                  htmlFor="image"
                  className=" text-white flex gap-2 items-center"
                >
                  Upload Photo{" "}
                  {errors.imageOrVideo && (
                    <p className="text-red-500 text-sm items-center flex">
                      {errors.imageOrVideo}
                    </p>
                  )}
                </Label>
                <input
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
                  {imageOrVideo ? imageOrVideo.name : "Choose File"}
                </label>
              </div>

              <div className="space-y-2 w-full ">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add location"
                  className=" text-black"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </>
      ) : page == 3 && postType == "video" ? (
        <>
          <div className=" flex">
            <h2 className=" font-semibold text-xl text-center w-full pt-2 text-white">
              Select Video
            </h2>
            <div
              className=" flex items-center justify-center cursor-pointer"
              onClick={() => closeForm()}
            >
              <Cross className=" rotate-45" />
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <div className=" flex gap-5">
              <div className="space-y-2 w-full flex flex-col pt-[9px]">
                <Label htmlFor="image" className=" flex gap-3">
                  Upload Video
                  {errors.imageOrVideo && (
                    <p className="text-red-500 text-sm items-center flex">
                      {errors.imageOrVideo}
                    </p>
                  )}
                </Label>
                <input
                  id="image"
                  type="file"
                  accept="video/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer px-3 py-[10px] text-sm font-medium border border-gray-300 rounded-md text-gray-700 bg-gray-100"
                >
                  {imageOrVideo ? imageOrVideo.name : "Choose File"}
                </label>
              </div>

              <div className="space-y-2 w-full ">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add location"
                  className=" text-black"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {page == 4 && postType == "photo" ? (
        <>
          <div>
            <div className=" w-full text-center text-2xl font-semibold flex justify-center items-center pt-2">
              <div className=" w-10/12 text-end"> Song Details</div>
              <div
                className=" flex justify-end cursor-pointer w-6/12"
                onClick={() => closeForm()}
              >
                <Cross className=" rotate-45" />
              </div>
            </div>
            {songData != null ? (
              <div className=" mt-5">
                <div className=" mb-2">Select the song clip to be added:</div>
                <Mirt
                  file={file}
                  onChange={TrimmerValueOnChange}
                  className=" custom-audio-trimmer mb-2"
                  pausePlaying={playing}
                />
                From{" "}
                <span className=" flex gap-3 text-red-500">
                  {initialVal} - {finalVal}
                </span>
              </div>
            ) : (
              <div className=" mt-5">
                <div className=" mb-2">
                  Click Enter if you want to upload the file
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}

      {isUploading ? <p>Progress: {progress}%</p> : ""}

      <div className=" flex justify-center w-full">
        <Button type="submit" className="w-2/5 ">
          {page == 2 || page == 1 ? "Next" : "Upload"}
        </Button>
      </div>
    </form>
  );
}

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
                return null;
              }
              const identifier = `${value.data[0].type}`;

              if (!processedItems.has(identifier)) {
                processedItems.add(identifier);
                return (
                  <div
                    key={key}
                    className=" p-0 m-0 Montserrat-regular grid grid-cols-3 gap-1"
                  >
                    {value.data[0].type === "song" ? (
                      <>
                        {value.data.map((value: any) => {
                          const SearchSong = getImageURL(value?.image);
                          return (
                            <div
                              className=" flex gap-2  cursor-pointer hover:bg-[#2f2f2f45] rounded-md"
                              onClick={() => SelectSong(value)}
                              key={value?.id}
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
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className=" h-12 text-sm  flex items w-full items-center justify-center text-center">
            &quot;Search Songs To Add to your Post&quot;
          </div>
        )}
      </div>
    </div>
  );
}
