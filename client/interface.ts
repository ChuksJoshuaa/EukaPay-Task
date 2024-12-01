import { AUTH, FETCH_ALL_TODO, LOADING, LOGOUT, OPENSIDEBAR, SETSCREEN } from "@/constants";

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface AuthState {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  comfirmPassword?: string;
}

export interface InputProps {
  half?: boolean;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  label: string;
  type: string;
  handleShowPassword?: () => void;
  isError?: boolean;
  value?: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponse {
  result: User;
  token: string;
}

export type FetchProps = {
  method: string;
  headers?: { "Content-Type": string };
  body?: BodyInit | null | undefined;
};
export interface TodoProps {
  title: string;
  status: "Done" | "Unfinished";
  dueDate: string;
}  

export type DataProps = {
  _id: string;
  title: string;
  status: "Done" | "Unfinished";
  createdBy: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FetchTodosProps {
  count: number;
  data: DataProps[];
}

export interface InitialProps {
  loading: boolean;
  screenSize: number | null;
  isSidebarOpen: boolean;
  loginDetails?: AuthResponse | null;
  allTodos?: FetchTodosProps | null
}
export interface TableViewProps {
  rows: DataProps[];
}


export type AppAction =
  | { type: typeof LOADING; payload: boolean }
  | { type: typeof OPENSIDEBAR; payload: boolean }
  | { type: typeof SETSCREEN; payload: number }
  | { type: typeof AUTH; payload: AuthResponse | null }
  | { type: typeof LOGOUT }
  | { type: typeof FETCH_ALL_TODO;  payload:  FetchTodosProps | null};