import { Redirect, Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { firebaseAuth } from "../../firebaseConfig";

const StackLayout = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) return <Redirect href="/" />;
      else return <Redirect href="/login" />;
    });
  }, [router]);

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerTitle: "login", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create account",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
