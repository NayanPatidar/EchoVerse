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
