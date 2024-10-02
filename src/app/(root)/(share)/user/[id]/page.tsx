"use client";

import { useAuthProvider } from "@/context/AuthContext";
import { database } from "@/lib/firebase";
import { CompleteUserData, UserData } from "@/types/user";
import { onValue, ref, set } from "firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

const User = ({ params }: { params: { id: string } }) => {
  const [AllUser, SetAllUser] = useState<CompleteUserData | undefined>();
  const [posts, setPosts] = useState(null);
  const { token, tokenDetails } = useAuthProvider();

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

  const SendRequest = async () => {
    try {
      const res = await fetch("/api/friends/friendRequest/sent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: tokenDetails.userId,
          receiverId: params.id,
        }),
      });
    } catch (error: any) {
      console.error("Error is sending friends Request : ", error.message);
    }
  };

  const [status, setStatus] = useState("FOLLOW"); // "FOLLOW", "FOLLOW_REQUEST_SENT", "FOLLOW_BACK", "FRIENDS"

  useEffect(() => {
    const followRequestRef = ref(
      database,
      `followRequests/${tokenDetails.userId}/${params.id}`
    );

    const unsubscribe = onValue(followRequestRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStatus(data.status === "PENDING" ? "FOLLOW_BACK" : "FRIENDS");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tokenDetails.userId, params.id]);

  const sendFollowRequest = async () => {
    await set(
      ref(database, `followRequests/${tokenDetails.userId}/${params.id}`),
      {
        status: "PENDING",
      }
    );
    await set(
      ref(database, `followRequests/${params.id}/${tokenDetails.userId}`),
      {
        status: "PENDING",
      }
    );

    setStatus("FOLLOW_REQUEST_SENT");
  };

  const acceptFollowRequest = async () => {
    await set(
      ref(database, `friends/${tokenDetails.userId}/${params.id}`),
      true
    );
    await set(
      ref(database, `friends/${params.id}/${tokenDetails.userId}`),
      true
    );

    await set(
      ref(database, `followRequests/${tokenDetails.userId}/${params.id}`),
      null
    );
    await set(
      ref(database, `followRequests/${params.id}/${tokenDetails.userId}`),
      null
    );

    setStatus("FRIENDS");
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
            {status === "FOLLOW" && (
              <button onClick={sendFollowRequest}>Follow</button>
            )}
            {status === "FOLLOW_REQUEST_SENT" && (
              <button disabled>Follow Request Sent</button>
            )}
            {status === "FOLLOW_BACK" && (
              <button onClick={acceptFollowRequest}>Follow Back</button>
            )}
            {status === "FRIENDS" && <button disabled>Friends</button>}
          </div>
        </div>
      </div>
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
