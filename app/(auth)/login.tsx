import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Button from "../../components/Button";
import HR from "../../components/HR";
import Logo from "../../components/Logo";
import Footer from "../../components/Footer";
import { Link, Redirect, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
  GoogleAuthProvider,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import { onAuthenticationSuccess } from "../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../../store";
import { FIREBASE_AUTH_ERRORS } from "../../constants/firebase.const";
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setAuthenticatedUser = useStore((state) => state.setAuthenticatedUser);


  const handleLoginWithEmailPassword = () => {
    if (email !== "" && password !== "") {
      setLoading(true);
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result: UserCredential) => {
          onAuthenticationSuccess(result.user);
          setAuthenticatedUser(result.user);
          router.push("/");
          setLoading(false);
        })
        .catch((error) => {
          if (error.message === FIREBASE_AUTH_ERRORS.connectionError) {
            toast.error("You might be having connection issues");
          } else if (error.message === FIREBASE_AUTH_ERRORS.userNotFound) {
            toast.error("User not found");
          } else if (error.message === FIREBASE_AUTH_ERRORS.wrongPassword) {
            toast.error("Wrong Password");
          } else {
            toast.error(error.message);
          }
          setLoading(false);
        });
    } else {
      toast.error("Both fields are required");
    }
  };

  const handleLoginWithGoogle = () => {
    signInWithRedirect(firebaseAuth, googleProvider)
      .then(async (result: UserCredential) => {
        onAuthenticationSuccess(result.user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Toaster />
      <View style={styles.wrapper}>
        <View style={{ alignItems: "center", marginBottom: 20, gap: 20 }}>
          <Logo />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            LOGIN TO{" "}
            <span
              style={{
                textDecorationLine: "underline",
                textDecorationColor: "blueviolet",
                textDecorationStyle: "wavy",
              }}
            >
              CAR-GO
            </span>
          </Text>
        </View>
        <View style={{ gap: 6 }}>
          <View style={{ gap: 4 }}>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="devsteve@gmail.com"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
          <View style={{ gap: 4 }}>
            <Text>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              keyboardType={"visible-password"}
              style={styles.input}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              label={loading ? "Loading..." : "Login"}
              onPress={handleLoginWithEmailPassword}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <HR />
            <View>
              <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
            </View>
            <HR />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              label="Continue with google"
              onPress={handleLoginWithGoogle}
              style={{ gap: 4 }}
              icon={<AntDesign name="google" size={18} color="white" />}
            />
          </View>
        </View>
        <View>
          <View style={styles.isUserContainer}>
            <Text> Don't Have an account?</Text>
            <Link href="/register" asChild>
              <Pressable>
                <Text>Create account</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#F1EFE7",
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  isUserContainer: {
    padding: 10,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Login;
