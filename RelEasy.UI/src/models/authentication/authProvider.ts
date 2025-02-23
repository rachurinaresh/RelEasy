import { Dispatch, SetStateAction } from "react";

export interface authProvider {
  user?: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  isLoggedIn: boolean;
  logOut: () => void;
  logIn: () => void;
}
