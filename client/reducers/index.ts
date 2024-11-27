import {
    LOADING,
    OPENSIDEBAR,
    SETSCREEN,
} from "@/constants";
import { AppAction, InitialProps } from "@/interface";


export const ContextReducers = (state: InitialProps, action: AppAction) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case SETSCREEN:
      return { ...state, screenSize: action.payload };
    case OPENSIDEBAR:
      return { ...state, isSidebarOpen: action.payload };
    default:
      return { ...state };
  }
};