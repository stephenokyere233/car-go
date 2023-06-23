import { Redirect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useStore } from "../store";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

export default function App() {
  const router = useRouter();
  const authenticatedUser = useStore((state) => state.authenticatedUser);
  // TODO: Add a loading screen while the user is being fetched and/or logged in /

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) return <Redirect href="/" />;
      else return <Redirect href="/login" />;
    });
  }, [router]);

  return (
    <View style={{ backgroundColor: "red" }}>
      <Toaster />
      <Text>Hello world</Text>
    </View>
  );
}
