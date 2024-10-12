export type NotificationsType = "POST" | "FOLLOW";

export type Notification = {
  content: String;
  id: String;
  receiver: Object;
  recevierId: String;
  senderId: String;
  type: String;
};
