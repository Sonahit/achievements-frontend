import React, { SyntheticEvent, useState } from "react";
import { AuthContext } from "./contexts/auth.context";
import { User } from "./entities/User";
import "./App.module.css";
import SignUp from "./components/modals/SignUp";
import Login from "./components/modals/Login";

const modals = { signUp: SignUp, login: Login };

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [modal, setModal] = useState<keyof typeof modals | null>(null);

  const handleSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    const select = e.currentTarget;
    setModal(
      Object.keys(modals).includes(select.value)
        ? (select.value as keyof typeof modals)
        : null
    );
  };
  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser }}>
      Hello
      <select defaultValue="None" onChange={handleSelect}>
        {[...Object.keys(modals), "None"].map((k, i) => (
          <option key={`${k}-${i}`} value={k}>
            {k}
          </option>
        ))}
      </select>
      {modal && modals[modal]({ closeModal: () => setModal(null) })}
    </AuthContext.Provider>
  );
}
