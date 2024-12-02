export const LOADING = "LOADING";
export const OPENSIDEBAR = "OPENSIDEBAR";
export const SETSCREEN = "SETSCREEN";
export const LOGOUT = "LOGOUT"
export const AUTH = "AUTH";
export const FETCH_ALL_TODO = "FETCH_ALL_TODO"
export const SINGLE_TODO = "SINGLE_TODO"
export const API_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_API_URL
    : process.env.NEXT_PUBLIC_LIVE_API_URL;
export const SIGNUP_URL = `${API_URL}/api/v1/user/register`;
export const SIGNIN_URL = `${API_URL}/api/v1/user/login`;
export const CREATE_URL = `${API_URL}/api/v1/todos/create`
export const UPDATE_URL = `${API_URL}/api/v1/todos/update`
export const DELETE_URL = `${API_URL}/api/v1/todos/delete`
export const FETCH_ALL_TODO_URL = `${API_URL}/api/v1/todos`
export const FETCH_USER_TODO_URL = `${API_URL}/api/v1/todos/user`
export const isWindow = typeof window !== "undefined"
export const imageUrl =
  "https://res.cloudinary.com/chuksmbanaso/image/upload/v1732942217/images_topxoz.jpg";
export const personUrl = "https://res.cloudinary.com/chuksmbanaso/image/upload/v1732942318/images_fm0nro.png"
