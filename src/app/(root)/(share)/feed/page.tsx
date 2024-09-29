"use client";
import PostSong, { PostUploadForm } from "@/components/postSong";
import SearchFriends from "@/components/searchFriends";
import UserPostCard from "@/components/ui/Cards/userPostCard";
import { useAuthProvider } from "@/context/AuthContext";
import { useGeneralContext } from "@/context/GeneralContext";
import { PostProps } from "@/types/post";
import React, { useEffect, useState } from "react";

const FeedPage = () => {
  const { PostSongForm } = useGeneralContext();
  const { token } = useAuthProvider();
  const [PostsData, SetPostsData] = useState<PostProps[] | undefined>(
    undefined
  );

  const FetchAllPosts = async () => {
    const posts = await fetch("api/posts/getAllPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beared ${token}`,
      },
    });

    const postsData = await posts.json();
    SetPostsData(postsData.post);
    console.log(postsData.post);
  };

  useEffect(() => {
    FetchAllPosts();
  }, []);

  return (
    <div className=" flex flex-row w-full gap-3 p-2">
      {PostSongForm ? <PostUploadForm /> : ""}
      <div className=" w-8/12 h-full overflow-y-visible">
        {PostsData &&
          Object.entries(PostsData).map(([key, val]) => {
            return (
              <UserPostCard
                audioEndTime={val.audioEndTime}
                audioLink={val.audioLink}
                audioStartTime={val.audioStartTime}
                createdAt={val.createdAt}
                description={val.description}
                id={val.id}
                imageDownload={val.imageDownload}
                location={val.location}
                userId={val.userId}
              />
            );
          })}
      </div>
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
