"use client"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorPopup = (text: string) =>
  toast.error(text, {
    position: "top-right",
  });

export const SuccessPopup = (text: string) =>
  toast.success(text, {
    position: "top-right",
  });
