"use client";

import { CompleteUserData, UserData } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";

const User = ({ params }: { params: { id: string } }) => {
  const [AllUser, SetAllUser] = useState<CompleteUserData | undefined>();
  const [posts, setPosts] = useState(null);

  const GetUsers = async () => {
    try {
      const res = await fetch(`/api/friends/searchUser?id=${params.id}`);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Search error:", errorData.error);
        return;
      }

      const data = await res.json();
      SetAllUser(data.Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-4xl flex flex-row items-start p-5 border-b border-gray-700">
        <div className="mr-8">
          <Image
            src={"/User.webp"}
            alt="User Icon"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-start w-full">
          <h1 className="text-3xl font-bold">
            {AllUser?.name || "Loading..."}
          </h1>

          <div className="flex flex-row space-x-4 mt-2">
            <span className=" text-sm">
              {AllUser?.followers || 0} Followers
            </span>
            <span className=" text-sm">
              {AllUser?.following || 0} Following
            </span>
          </div>

          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="w-full max-w-4xl mt-8 p-5">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {posts ? (
          // posts.map((post: any) => (
          //   <div key={post.id} className="mb-4 p-4 bg-gray-800 rounded-md">
          //     <p>{post.content}</p>
          //   </div>
          // ))
          <div></div>
        ) : (
          <p className="text-gray-500">No posts present</p>
        )}
      </div>
    </div>
  );
};

export default User;
