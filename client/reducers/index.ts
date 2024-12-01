import { AUTH, LOADING, LOGOUT, OPENSIDEBAR, SETSCREEN, FETCH_ALL_TODO  } from "@/constants";
import { AppAction, AuthResponse, InitialProps } from "@/interface";
import { storeUserData } from "@/utils/localStorage";

export const ContextReducers = (state: InitialProps, action: AppAction) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case SETSCREEN:
      return { ...state, screenSize: action.payload };
    case OPENSIDEBAR:
      return { ...state, isSidebarOpen: action.payload };
    case FETCH_ALL_TODO:
      return { ...state, allTodos: action.payload };
    case AUTH:
      const result = action.payload
      storeUserData(result as AuthResponse)
      return { ...state, loginDetails: result as AuthResponse };
    case LOGOUT:
      localStorage.clear();
      return { ...state, loginDetails: null };
    default:
      return { ...state };
  }
};
