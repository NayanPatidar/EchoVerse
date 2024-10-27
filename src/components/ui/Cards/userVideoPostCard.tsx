"use client";
import { VideoPostProps } from "@/types/post";
import { Pause, Play } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { VscUnmute } from "react-icons/vsc";
import { IoVolumeMuteOutline } from "react-icons/io5";

type MuteProp = {
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
};

const VideoPostCard: React.FC<VideoPostProps & MuteProp > = ({
  createdAt,
  description,
  id,
  videoDownloadLink,
  location,
  userId,
  isMuted,
  setIsMuted,
  User
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const playVideo = async () => {
      if (videoElement) {
        videoElement.autoplay = true;
        videoElement.muted = isMuted;
        try {
          await videoElement.play();
          setIsPlaying(true);
          setHasPlayedOnce(true);
        } catch (err) {
          console.error("Autoplay failed", err);
        }
      }
    };

    const pauseVideo = () => {
      if (videoElement) {
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMuted]);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        videoElement.play();
        setIsPlaying(true);
      }
    }
  };

  // Mute/Unmute toggle
  const toggleMute = () => {
    setIsMuted((prev: boolean) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div ref={cardRef} className="w-full max-w-xl mx-auto rounded-lg p-4 mb-6">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={`./ProfilePhoto.png`}
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-semibold">{User.name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="relative w-full h-[22rem] mb-4 bg-black flex justify-center rounded-md">
        {videoDownloadLink ? (
          <video
            ref={videoRef}
            muted={isMuted}
            controls={false}
            className=" w-[300px] object-cover rounded-lg"
          >
            <source src={videoDownloadLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Video not available</p>
        )}

        <div
          onClick={togglePlayPause}
          className="absolute bottom-1 left-1 z-[100] text-white px-4 py-2 rounded-md cursor-pointer"
        >
          {isPlaying ? <Pause /> : <Play />}
        </div>

        <div
          onClick={toggleMute}
          className="absolute bottom-1 right-1 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          {isMuted ? <IoVolumeMuteOutline /> : <VscUnmute />}
        </div>
      </div>

      {/* Post Description */}
      <div className="mb-4">
        <p className="text-sm text-white">{description}</p>
      </div>

      {/* Post Meta Data */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default VideoPostCard;
