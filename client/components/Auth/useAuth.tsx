"use client";

import { signIn, signUp } from "@/api";
import { AUTH } from "@/constants";
import MyContext from "@/contexts";
import { AuthState } from "@/interface";
import { ErrorPopup, SuccessPopup } from "@/utils/notification";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const initialState: AuthState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  comfirmPassword: "",
};
const useAuth = () => {
  const { dispatch } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (isSignup) {
      try {
        const resp = await signUp(formData);
        if (resp && "result" in resp) {
          dispatch({ type: AUTH, payload: resp });
          SuccessPopup("Account created successfully! Welcome aboard!");
          router.push("/");
        } else {
          ErrorPopup(resp?.error?.message ?? "Sorry, an error occurred");
        }
      } catch (error) {
        ErrorPopup("Sorry, an error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const resp = await signIn(formData);
        if (resp && "result" in resp) {
          dispatch({ type: AUTH, payload: resp });
          SuccessPopup("Welcome back! You've successfully logged in.");
          router.push("/");
        } else {
          ErrorPopup(resp?.error?.message ?? "Sorry, an error occurred");
        }
      } catch (error) {
        ErrorPopup("Sorry, an error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return {
    switchMode,
    handleChange,
    handleSubmit,
    handleShowPassword,
    showPassword,
    isSignup,
    setIsSignup,
    loading,
  };
};

export default useAuth;
