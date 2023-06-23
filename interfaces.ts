import { Timestamp } from "firebase/firestore";

export interface StoreState extends StoreAction {
  authenticatedUser: any | null;
}

export interface StoreAction {
  setAuthenticatedUser: (
    authenticatedUser: StoreState["authenticatedUser"]
  ) => void;
}

export interface User {
  uid?: string;
  name: string;
  email: string;
  photoURL: string | null;
  isAdmin: boolean;
  createdAt: any;
  phoneNumber: string;
}
