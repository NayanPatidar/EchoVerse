"use client";
import { PostProps } from "@/types/post";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthProvider } from "./AuthContext";

interface FeedProps {
  PostsData: PostProps[] | undefined;
  SetPostsData: Dispatch<SetStateAction<PostProps[] | undefined>>;
  PostsUpdate: boolean;
  SetPostsUpdate: Dispatch<SetStateAction<boolean>>;
}

const FeedContext = createContext<FeedProps | undefined>(undefined);

interface GeneralFeedProp {
  children: ReactNode;
}

export const FeedContextProvider: React.FC<GeneralFeedProp> = ({
  children,
}) => {
  const [PostsData, SetPostsData] = useState<PostProps[] | undefined>(
    undefined
  );
  const [PostsUpdate, SetPostsUpdate] = useState<boolean>(false);
  const { token } = useAuthProvider();

  const FetchAllPosts = async () => {
    if (!token) return;
    console.log(token);

    const posts = await fetch("/api/posts/getAllPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const postsData = await posts.json();
    SetPostsData(postsData.post);
    console.log(postsData.post);
  };

  useEffect(() => {
    FetchAllPosts();
  }, [token, PostsUpdate]);

  return (
    <FeedContext.Provider
      value={{ PostsData, SetPostsData, PostsUpdate, SetPostsUpdate }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = (): FeedProps => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error(
      "Use Feed Context has to bee used in the Feed Context Provider"
    );
  }
  return context;
};
