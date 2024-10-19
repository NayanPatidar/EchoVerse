"use client";
import { timeStringToSeconds } from "@/lib/utils";
import { PostProps } from "@/types/post";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AiFillMuted } from "react-icons/ai";
import { VscUnmute } from "react-icons/vsc";
import { IoVolumeMuteOutline } from "react-icons/io5";

type MuteProp = {
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
};

const UserPostCard: React.FC<PostProps & MuteProp> = ({
  audioEndTime,
  audioLink,
  audioStartTime,
  createdAt,
  description,
  id,
  imageDownloadLink,
  location,
  userId,
  isMuted,
  setIsMuted,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    const startTime = timeStringToSeconds(audioStartTime);
    const endTime = timeStringToSeconds(audioEndTime);

    const playAudio = async () => {
      if (audioElement) {
        audioElement.autoplay = true;
        // audioElement.muted = isMuted;
        audioElement.currentTime = startTime;
        try {
          await audioElement.play();
          setIsPlaying(true);
          setHasPlayedOnce(true);
        } catch (err) {
          console.error("Autoplay failed", err);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (audioElement && audioElement.currentTime >= endTime) {
        audioElement.pause();
        setIsPlaying(false);
        setHasPlayed(true);
      }
    };

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAudio();
          } else {
            if (audioElement) {
              audioElement.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [audioStartTime, audioEndTime]);

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        if (hasPlayed) {
          audioElement.currentTime = timeStringToSeconds(audioStartTime);
          setHasPlayed(false);
        }
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const unmuteAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement && isMuted) {
      setIsMuted(false);
    } else if (audioElement && !isMuted) {
      setIsMuted(true);
    }
  };

  return (
    <div ref={cardRef} className="w-full max-w-xl mx-auto rounded-lg p-4 mb-6">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={`https://picsum.photos/seed/${userId}/40`}
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-semibold">{userId}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className=" relative w-full h-76 mb-4">
        <img
          src={imageDownloadLink}
          alt="Post Image"
          className="w-full h-full object-cover rounded-lg"
        />
        {audioLink && (
          <div
            onClick={() => togglePlayPause()}
            className="absolute bottom-1 left-1 z-[100] text-white px-4 py-2 rounded-md "
          >
            {isPlaying ? <Pause /> : <Play />}
          </div>
        )}

        {audioLink && (
          <div
            onClick={() => unmuteAudio()}
            className="absolute bottom-1 right-1 text-white px-4 py-2 rounded-md mb-2"
          >
            {isMuted ? <IoVolumeMuteOutline /> : <VscUnmute />}
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm text-white">{description}</p>
      </div>

      {/* Audio Info */}
      {audioLink && (
        <div className="mb-4">
          <audio ref={audioRef} muted={isMuted}>
            <source src={audioLink} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleString()}
        </p>
        {/* <button className="text-blue-500 font-semibold">Like</button> */}
      </div>
    </div>
  );
};

export default UserPostCard;
