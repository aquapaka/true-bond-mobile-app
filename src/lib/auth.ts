import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserRole } from "../types/User";
import { database } from "./firebase"; // Ensure this points to your Firebase config

const auth = getAuth();

/**
 * Registers a new user and saves them in Firestore.
 */
export async function signUp(email: string, password: string, role: UserRole) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (!user) throw new Error("User creation failed.");

  // Save user info in Firestore
  const userRef = doc(database, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email,
    role,
    createdAt: new Date().toISOString(),
  });

  return user;
}

/**
 * Signs in an existing user.
 */
export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

/**
 * Logs out the current user.
 */
export async function logout() {
  await signOut(auth);
}

/**
 * Retrieves user data from Firestore.
 */
export async function getUser(uid: string) {
  const userRef = doc(database, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found.");
  }

  return userSnap.data();
}
