export interface PostProps {
  audioEndTime: string;
  audioLink: string;
  audioStartTime: string;
  createdAt: string;
  description: string;
  id: number;
  imageDownloadLink: string;
  location: string;
  userId: string;
}

export interface VideoPostProps {
  createdAt: string;
  description: string;
  id: string;
  videoDownloadLink: string;
  location: string;
  userId: string;
}
