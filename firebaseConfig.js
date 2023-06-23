// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4_rPLtYpNujAxQggiVnEt8_lT6oNUC6s",
  authDomain: "car-go-6647f.firebaseapp.com",
  projectId: "car-go-6647f",
  storageBucket: "car-go-6647f.appspot.com",
  messagingSenderId: "453395719579",
  appId: "1:453395719579:web:6d6d1b9df0fee3429fed3e",
  measurementId: "G-5XZLF3SECX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestoreDB = getFirestore(app);
