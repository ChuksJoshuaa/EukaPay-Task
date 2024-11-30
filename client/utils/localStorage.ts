import { isWindow } from "@/constants";
import { AuthResponse, User } from "@/interface";

export const storeUserData = (data: AuthResponse) => {
  if (isWindow) {
    localStorage.setItem("user", JSON.stringify(data.result));
    localStorage.setItem("token", data.token);
  }
};

export const getUserData = (): User | null => {
  if (isWindow) {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};
export const getToken = (): string | null => {
  if (isWindow) return localStorage.getItem("token");
  return null
};

export const clearUserData = () => {
  if (isWindow) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};
