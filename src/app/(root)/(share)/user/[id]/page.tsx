"use client";
import { Button } from "@/components/ui/button";
import { GetUsers } from "@/components/user/details";
import { useAuthProvider } from "@/context/AuthContext";
import { database } from "@/lib/firebase";
import { CompleteUserData } from "@/types/user";
import { onValue, ref, remove, set } from "firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";

const User = ({ params }: { params: { id: string } }) => {
  const [status, setStatus] = useState("FOLLOW"); // "FOLLOW", "FOLLOW_REQUEST_SENT", "FOLLOW_BACK", "FRIENDS"
  const [unsubscribe, setUnsubscribe] = useState<null | (() => void)>(null);
  const [posts, setPosts] = useState(null);
  const { token, tokenDetails } = useAuthProvider();
  const [AllUser, setAllUser] = useState<CompleteUserData | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await GetUsers(params.id);
      setAllUser(user);
    };

    fetchUserData();
  }, []);

  const AddFriend = async () => {
    try {
      const response = await fetch("/api/friends/search&addFriend", {
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

      const result = await response.json();
      if (result) {
        console.log("Friend added to the database");
      }
    } catch (error: any) {
      console.error("Error is sending friends Request : ", error.message);
    }
  };

  const listenForFriendRequests = () => {
    const friendRequestRef = ref(
      database,
      `friendRequest/${tokenDetails.userId}`
    );

    const unsubscribeFunction = onValue(friendRequestRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const senderId = params.id;
        if (
          data[senderId] &&
          data[senderId].status === "PENDING" &&
          data[senderId].type == "SENDER"
        ) {
          setStatus("FOLLOW_BACK");
        } else if (
          data[senderId] &&
          data[senderId].status === "PENDING" &&
          data[senderId].type == "RECEIVER"
        ) {
          setStatus("FOLLOW_REQUEST_SENT");
        }
        if (data[senderId] && data[senderId].status === "ACCEPTED") {
          setStatus("FRIENDS");
        }
      }
    });

    setUnsubscribe(() => unsubscribeFunction);
  };

  const checkFriendStatus = async () => {
    try {
      const response = await fetch(
        `/api/friends/search&addFriend?userId=${tokenDetails.userId}&friendID=${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.isFriends) {
        setStatus("FRIENDS");
      } else {
        listenForFriendRequests();
      }
    } catch (error: any) {
      console.error("Error checking friend status:", error.message);
    }
  };

  useEffect(() => {
    if (!tokenDetails.userId) return;

    checkFriendStatus();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [tokenDetails]);

  const sendFollowRequest = () => {
    const sendersRequestRef = ref(
      database,
      `friendRequest/${params.id}/${tokenDetails.userId}`
    );

    const recieversRequestRef = ref(
      database,
      `friendRequest/${tokenDetails.userId}/${params.id}`
    );

    set(sendersRequestRef, {
      status: "PENDING",
      timeStamp: Date.now(),
      name: AllUser?.name,
      type: "SENDER",
    });

    set(recieversRequestRef, {
      status: "PENDING",
      timeStamp: Date.now(),
      type: "RECEIVER",
    });

    setStatus("FOLLOW_REQUEST_SENT");
  };

  const acceptFollowRequest = () => {
    const friendRequestRef = ref(
      database,
      `friendRequest/${params.id}/${tokenDetails.userId}`
    );

    const receiverFriendRequestRef = ref(
      database,
      `friendRequest/${tokenDetails.userId}/${params.id}`
    );

    set(friendRequestRef, {
      status: "ACCEPTED",
      timeStamp: Date.now(),
    });

    AddFriend();

    remove(friendRequestRef)
      .then(() => {
        console.log("Request removed successfully from sender's side");
      })
      .catch((error) => {
        console.error("Error removing request from sender's side:", error);
      });

    remove(receiverFriendRequestRef)
      .then(() => {
        console.log("Request removed successfully from receiver's side");
      })
      .catch((error) => {
        console.error("Error removing request from receiver's side:", error);
      });

    setStatus("FRIENDS");
  };

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
              <Button
                className=" bg-black hover:bg-black"
                onClick={() => sendFollowRequest()}
              >
                Follow
              </Button>
            )}
            {status === "FOLLOW_REQUEST_SENT" && (
              <Button className=" bg-black hover:bg-black" disabled>
                Follow Request Sent
              </Button>
            )}
            {status === "FOLLOW_BACK" && (
              <Button
                className=" bg-black hover:bg-black"
                onClick={acceptFollowRequest}
              >
                Follow Back
              </Button>
            )}
            {status === "FRIENDS" && <Button disabled>Friends</Button>}
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
