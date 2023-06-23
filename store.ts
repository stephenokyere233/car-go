import { create } from "zustand";
import { StoreState } from "./interfaces";

export const useStore = create<StoreState>((set) => ({
  authenticatedUser:null,
  setAuthenticatedUser: (authenticatedUser) =>
    set(() => ({ authenticatedUser: authenticatedUser })),
}));
