import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cross } from "lucide-react";
import { useAuthProvider } from "@/context/AuthContext";
import { title } from "process";
import { useGeneralContext } from "@/context/GeneralContext";
import { usePlaylistContext } from "@/context/PlaylistContext";

const formSchema = z.object({
  Title: z.string().min(1, { message: "Please Enter a Title" }),
  Description: z.string().min(1, { message: "Please Enter a Description " }),
});

export const PlaylistForm = () => {
  const { SetNewPlaylistFormOpen, SetNewPlaylistCreated } =
    usePlaylistContext();
  const { SetAddToPlaylistFormOpen } = useGeneralContext();
  const { token } = useAuthProvider();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    CloseForm();

    try {
      const res = await fetch("/api/playlistForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: values.Title,
          description: values.Description,
        }),
      });

      const data = await res.json();

      if (data) {
        SetNewPlaylistCreated((prev) => !prev);
        CloseForm();
      }
    } catch (error: any) {
      console.error("New Playlist Form Found Error : " + error.message);
    }
  }

  const CloseForm = () => {
    SetAddToPlaylistFormOpen(false);
    SetNewPlaylistFormOpen(false);
  };

  return (
    <div className="absolute w-[35rem] h-auto z-[400] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-2 bg-[#0b0b0b] rounded-md px-5">
      <div className=" flex">
        <div className=" font-semibold my-4 text-3xl text-center justify-center w-full flex">
          New Playlist
        </div>
        <div
          className=" flex items-center justify-center cursor-pointer"
          onClick={() => CloseForm()}
        >
          <Cross className=" rotate-45" />
        </div>
      </div>

      <span></span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex flex-col text-black"
        >
          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    type="Text"
                    color="black"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    type="Text"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-full">
            <Button type="submit" className="  my-5 w-full">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
