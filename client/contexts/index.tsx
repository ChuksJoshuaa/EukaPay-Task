'use client'

import { OPENSIDEBAR, SETSCREEN } from "@/constants";
import { initialState } from "@/contexts/state";
import { AppAction, ChildrenProps, InitialProps } from "@/interface";
import { ContextReducers } from "@/reducers";
import { createContext, useEffect, useReducer } from "react";

// Create the context
const MyContext = createContext<{
  state: InitialProps;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

export const ContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(ContextReducers, initialState);

  const checkWidth = () => {
    let windowWidth = null;
    if (typeof window !== "undefined") {
      windowWidth = window?.innerWidth;
      dispatch({ type: SETSCREEN, payload: windowWidth });
    }

    if (windowWidth) {
      if (windowWidth <= 850) dispatch({ type: OPENSIDEBAR, payload: true });
      if (windowWidth >= 850) dispatch({ type: OPENSIDEBAR, payload: false });
      return windowWidth;
    }
  };

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [state.screenSize]);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
