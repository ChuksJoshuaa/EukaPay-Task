import {
  API_URL,
  CREATE_URL,
  DELETE_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  UPDATE_URL,
} from "@/constants";
import { AuthState, TodoProps } from "@/interface";
import { getToken } from "@/utils/localStorage";
import axios from "axios";

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {
  if (getToken()) {
    req.headers.Authorization = `Bearer ${getToken()}`;
  }
  return req;
});

export const signIn = async (FormData: AuthState) => {
  try {
    const response = await API.post(SIGNIN_URL, FormData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || "An error occurred" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const signUp = async (FormData: AuthState) => {
  try {
    const response = await API.post(SIGNUP_URL, FormData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || "An error occurred" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const createTodo = async (FormData: TodoProps) => {
  try {
    const response = await API.post(CREATE_URL, FormData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || "An error occurred" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const updateTodo = async (id: string, FormData: TodoProps) => {
  try {
    const response = await API.patch(`${UPDATE_URL}/${id}`, FormData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || "An error occurred" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await API.delete(`${DELETE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || "An error occurred" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
