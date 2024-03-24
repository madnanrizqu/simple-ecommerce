import { LoggedInUser } from "@/type/user";
import { create } from "zustand";

interface State {
  user: LoggedInUser | null;
  token: string | null;
  setToken: (token: string) => void;
  setUser: (user: LoggedInUser) => void;
}

export const useAuthStore = create<State>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  setToken: (token) => set({ token }),
}));
