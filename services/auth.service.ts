import { UserCredential } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestoreDB } from "../firebaseConfig";
import { COLLECTIONS } from "../constants/firebase.const";
import { User } from "../interfaces";
import toast from "react-hot-toast";

export async function onAuthenticationSuccess(
  firebaseUser: UserCredential["user"]
) {
  let docRef = doc(firestoreDB, `${COLLECTIONS.users}/${firebaseUser.uid}`);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    if (!firebaseUser.email) return;

    let newUser: User = {
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email,
      phoneNumber: firebaseUser.phoneNumber,
      uid: firebaseUser.uid,
      photoURL: firebaseUser.photoURL || null,
      createdAt: Date.now(),
      isAdmin: false,
    };

    setDoc(
      doc(firestoreDB, `${COLLECTIONS.users}/${firebaseUser.uid}`),
      newUser
    )
      .then(async () => {
        toast.success("Signed up successfully");
      })
      .catch(() => console.error("Couldn't add user"));
  } else toast.success("Welcome");
}
