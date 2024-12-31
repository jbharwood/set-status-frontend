"use client";

import { IUser } from "@/types/interfaces";
import { useUser } from "@clerk/nextjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      setCurrentUser({
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        id: user.id,
        room: "a",
        image: user.imageUrl,
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useCurrentUser must be used within a UserProvider");
  }
  return context;
}
