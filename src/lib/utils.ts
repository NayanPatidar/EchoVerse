import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ImageQuality, Quality, Type } from "@/types";
import { MirtOptions } from "@/components/external/Mirt";
import { Notifications } from "@/types/notification";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageURL(image: Quality) {
  if (typeof image === "string") {
    return image;
  } else {
    return image[2].link;
  }
}

export function getCurrentYear() {
  const currectYear: number = new Date().getFullYear();
  return currectYear;
}

export function getHref(url: string, type: Type) {
  const re = /https:\/\/www.jiosaavn.com\/(s\/)?\w*/;
  return `/${url.replace(re, type)}`;
}

export const toSeconds = (milliseconds: number) => {
  return milliseconds / 1000;
};

export const debounce = (fn: Function, ms = 3000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const getMinValue = (
  fineTuning: number,
  fineTuningResolution: number,
  duration: number
): number => {
  if (fineTuning === -1) return 0;

  return fineTuning - (fineTuningResolution * fineTuning) / duration;
};

export const getMaxValue = (
  fineTuning: number,
  fineTuningResolution: number,
  duration: number
): number => {
  if (fineTuning === -1) return duration;

  return (
    fineTuning + (fineTuningResolution * (duration - fineTuning)) / duration
  );
};

export const getStartHandleValue = (
  position: number,
  fineTuning: number,
  fineTuningResolution: number,
  duration: number
): string => {
  let value = 0;

  if (fineTuning >= 0 && fineTuningResolution) {
    const min = fineTuning - (fineTuningResolution * fineTuning) / duration;

    value = ((position - min) * 100) / fineTuningResolution;
  } else {
    value = (position * 100) / duration;
  }

  return value.toFixed(4);
};

export const getRawData = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const rawData = await audioBuffer.getChannelData(0);

  return rawData;
};

export const getEndHandleValue = (
  position: number,
  fineTuning: number,
  fineTuningResolution: number,
  duration: number
): string => {
  let value = 0;

  if (fineTuning >= 0 && fineTuningResolution) {
    const max =
      fineTuning + (fineTuningResolution * (duration - fineTuning)) / duration;

    value = ((position - max) * 100 * -1) / fineTuningResolution;
  } else {
    value = (position * 100 * -1) / duration + 100;
  }

  return value.toFixed(4);
};

export const getWaveformData = async (
  rawData: Float32Array,
  canvas: HTMLCanvasElement,
  fineTuning: number,
  fineTuningResolution: number,
  duration: number,
  config: MirtOptions
) => {
  const samples = Math.floor(canvas.offsetWidth / config.waveformBlockWidth);

  let data: Float32Array;

  if (fineTuning >= 0) {
    const ftStart = fineTuning - (fineTuningResolution * fineTuning) / duration;
    const ftEnd =
      fineTuning + (fineTuningResolution * (duration - fineTuning)) / duration;
    const min = Math.floor((rawData.length * ftStart) / duration);
    const max = Math.floor((rawData.length * ftEnd) / duration);

    data = rawData.slice(min, max);
  } else {
    data = rawData;
  }

  const blockSize = Math.floor(data.length / samples);
  const filteredData = [];

  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;

    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(data[blockStart + j]);
    }

    filteredData.push(sum / blockSize);
  }

  const multiplier = Math.pow(Math.max(...filteredData), -1);
  const normalizedData = filteredData.map((n) => n * multiplier);

  return normalizedData;
};

export const timeStringToSeconds = (time: string): number => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const SendNotification = async (
  type: Notifications,
  senderId: String,
  receiverId: String,
  token: String,
  name: String
) => {
  try {
    const res = await fetch("", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: type,
        senderId: senderId,
        receiverId: receiverId,
        name: name,
      }),
    });

    const update = await res.json();
    return update;
  } catch (error: any) {
    console.error("Got Error in Sending Notification : ", error.message);
  }
};
