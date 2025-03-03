import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  role: "ADMIN" | "STUDENT" | null;
  setRole: (role: "ADMIN" | "STUDENT" | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}
