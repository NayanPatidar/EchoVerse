export type UserData = {
  id: String;
  name: String;
  googleId: String;
  email: String;
};

export type CompleteUserData = {
  id: String;
  name: String;
  googleId: String;
  email: String;
  followers: number;
  following: number;
};

export type FriendData = {
  relationId: String;
  friendName: String;
  friendId: String;
};

export type Messages = {
  name: String;
  userId: String;
  message: String;
};
