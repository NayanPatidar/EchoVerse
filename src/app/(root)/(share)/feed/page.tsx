"use client";
import PostSong, { PostUploadForm } from "@/components/postSong";
import SearchFriends from "@/components/searchFriends";
import { useAuthProvider } from "@/context/AuthContext";
import { useGeneralContext } from "@/context/GeneralContext";
import React, { useEffect } from "react";

const FeedPage = () => {
  const { PostSongForm } = useGeneralContext();
  const { token } = useAuthProvider();

  const FetchAllPosts = async () => {
    const posts = await fetch("api/posts/getAllPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beared ${token}`,
      },
    });

    const postsData = await posts.json();
    console.log(postsData);
  };

  useEffect(() => {
    FetchAllPosts();
  }, []);

  return (
    <div className=" flex flex-row w-full gap-3 p-2">
      {PostSongForm ? <PostUploadForm /> : ""}
      <div className=" w-8/12 h-full overflow-y-visible"></div>
      <div
        className=" w-4/12 overflow-y-hidden flex flex-col gap-5"
        style={{ height: "calc(100vh - 11rem)" }}
      >
        <SearchFriends />
        <PostSong />
      </div>
    </div>
  );
};

export default FeedPage;
