import React from "react";
import { User } from "../entities/User";

export type AuthProps = InitialProps & {
  setToken: (token: string) => void;
  setUser: (user: Partial<User> | null) => void;
};

type InitialProps = {
  user: Partial<User> | null;
  token: string | null;
};

export const authInitialProps: InitialProps = {
  user: null,
  token: null,
};

export const AuthContext = React.createContext<AuthProps>(
  authInitialProps as any
);
