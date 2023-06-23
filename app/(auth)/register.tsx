import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Button from "../../components/Button";
import HR from "../../components/HR";
import Logo from "../../components/Logo";
import { Link, useRouter } from "expo-router";
import Footer from "../../components/Footer";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";
import { onAuthenticationSuccess } from "../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../../store";
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setAuthenticatedUser = useStore((state) => state.setAuthenticatedUser);

  const registerUserWithEmailAndPassword = async () => {
    if (email !== "" && password !== "" && name !== "" && phone !== "") {
      setLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        onAuthenticationSuccess({
          ...res.user,
          phoneNumber: phone,
          displayName: name,
        });
        setLoading(false);
        setAuthenticatedUser({
          ...res.user,
          phoneNumber: phone,
          displayName: name,
        });
        router.push("/");
      } catch (error: any) {
        console.log(error);
        toast.error(`${error.message}`);
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
    }
  };

    const handleSignUpWithGoogle = () => {
      signInWithPopup(firebaseAuth, googleProvider)
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
        <Button
          width={50}
          icon={<Ionicons name="arrow-back" size={24} color="white" />}
          onPress={() => router.push("/login")}
        />
        <View style={{ alignItems: "center", marginBottom: 20, gap: 20 }}>
          <Logo />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            SIGNUP FOR{" "}
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
            <Text>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Stephen Okyere"
              style={styles.input}
            />
          </View>
          <View style={{ gap: 4 }}>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="devsteve@gmail.com"
              style={styles.input}
            />
          </View>
          <View style={{ gap: 4 }}>
            <Text>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              placeholder="02XXXXXX49"
              style={styles.input}
            />
          </View>
          <View style={{ gap: 4 }}>
            <Text>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              label={loading ? "Loading..." : "Sign up"}
              onPress={registerUserWithEmailAndPassword}
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
              onPress={handleSignUpWithGoogle}
              style={{ gap: 4 }}
              icon={<AntDesign name="google" size={18} color="white" />}
            />
          </View>
        </View>
        <View>
          <View style={styles.notUserContainer}>
            <Text>Already have an account?</Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text>Login</Text>
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
  notUserContainer: {
    padding: 10,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
