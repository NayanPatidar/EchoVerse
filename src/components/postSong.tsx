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

const PostSong = () => {
  const { SetPostSongForm } = useGeneralContext();
  return (
    <div className=" w-full rounded-md flex-col justify-center items-center">
      <Button
        className=" flex gap-2 w-full bg-[#202020] hover:bg-[#393939] hover:text-white"
        onClick={() => SetPostSongForm(true)}
      >
        <Send size={16} />
        Post Song
      </Button>
    </div>
  );
};

export function PostUploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [song, setSong] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ image, description, location, song });
    setImage(null);
    setDescription("");
    setLocation("");
    setSong("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute w-[45rem] h-auto z-[400] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-2 bg-[#0b0b0b] rounded-md px-5  space-y-6 shadow-md "
    >
      <h2 className=" font-semibold text-xl text-center w-full pt-2 text-white">
        Upload a Post
      </h2>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          placeholder="Write a caption for your post..."
          className=" text-black"
          required
        />
      </div>

      <div className="space-y-2 z-[450] text-black">
        <Label htmlFor="song" className=" text-white">Select Song</Label>
        <Select value={song} onValueChange={setSong}>
          <SelectTrigger>
            <SelectValue
              placeholder="Choose a song"
              className="text-black placeholder:text-black"
            />
          </SelectTrigger>
          <SelectContent className=" z-[450]">
            <SelectItem value="song1">Bohemian Rhapsody - Queen</SelectItem>
            <SelectItem value="song2">Imagine - John Lennon</SelectItem>
            <SelectItem value="song3">
              Like a Rolling Stone - Bob Dylan
            </SelectItem>
            <SelectItem value="song4">
              Smells Like Teen Spirit - Nirvana
            </SelectItem>
            <SelectItem value="song5">Billie Jean - Michael Jackson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className=" flex  gap-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
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
