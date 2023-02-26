export const host =
  "http://localhost:5000" || "https://chat-app-server-lzzk.onrender.com";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const userRoute = `${host}/api/auth/user`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/addMsg`;
export const getAllMessageRoute = `${host}/api/messages/getMsg`;
