"use client";
import PostSong, { PostUploadForm } from "@/components/postSong";
import SearchFriends from "@/components/searchFriends";
import UserPostCard from "@/components/ui/Cards/userImagePostCard";
import VideoPostCard from "@/components/ui/Cards/userVideoPostCard";
import { useFeedContext } from "@/context/FeedContext";
import { useGeneralContext } from "@/context/GeneralContext";
import React, { useState } from "react";

const FeedPage = () => {
  const { PostSongForm } = useGeneralContext();
  const [isMuted, setIsMuted] = useState(true);
  const { PostsData } = useFeedContext();

  return (
    <div className=" Feed-Page flex flex-row w-full gap-3 p-2 overflow-hidden">
      {PostSongForm ? <PostUploadForm /> : ""}
      <div className=" FeedContent w-8/12 h-full overflow-y-scroll">
        {PostsData &&
          Object.entries(PostsData).map(([key, val]) => {
            const fileExtension = val.imageDownloadLink
              ? val.imageDownloadLink
                  .split("?")[0]
                  .split(".")
                  .pop()
                  ?.toLowerCase()
              : null;

            const isVideo = ["mp4", "webm", "ogg"].includes(
              fileExtension as string
            );

            if (isVideo) {
              return (
                <VideoPostCard
                  key={key}
                  createdAt={val.createdAt}
                  description={val.description}
                  id={key}
                  videoDownloadLink={val.imageDownloadLink}
                  location={val.location}
                  userId={val.userId}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                />
              );
            }
            return (
              <UserPostCard
                key={key}
                audioEndTime={val.audioEndTime}
                audioLink={val.audioLink}
                audioStartTime={val.audioStartTime}
                createdAt={val.createdAt}
                description={val.description}
                id={val.id}
                imageDownloadLink={val.imageDownloadLink}
                location={val.location}
                userId={val.userId}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
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
