import React from "react";
import { User } from "../entities/User";

type Props = {
  user?: User;
  token: string | null;
};

const initial: Props = {
  token: null,
};

export const AuthContext = React.createContext(initial);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
