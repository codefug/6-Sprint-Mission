import { create } from "zustand";

type User = {
  accessToken: string;
};

type Store = {
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
};

export const useStore = create<Store>()((set) => ({
  user: null,
  login: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    document.cookie = `accessToken=${localStorage.getItem("accessToken")}`;
    return set(() => ({ user: { accessToken } }));
  },
  logout: () => set(() => ({ user: null })),
}));
