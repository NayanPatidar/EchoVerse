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
  User: Profile;
}

type Profile = {
  id: string;
  name: string;
  email: string;
};

export interface VideoPostProps {
  createdAt: string;
  description: string;
  id: string;
  videoDownloadLink: string;
  location: string;
  userId: string;
  User: Profile;
}
