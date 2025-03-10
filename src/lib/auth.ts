import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserRole } from "../types/User";
import { database } from "./firebase"; // Ensure this points to your Firebase config
import { FirebaseError } from "firebase/app";

const auth = getAuth();

/**
 * Registers a new user and saves them in Firestore.
 */
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const role: UserRole = "client"; // Fixed role

    if (!user) throw new Error("User creation failed.");

    // Firestore reference
    const userRef = doc(database, "users", user.uid);

    // Check if document already exists (shouldn't, but good practice)
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      console.log("🔥 User document already exists in Firestore.");
    } else {
      console.log("📝 Creating new user document...");
      await setDoc(userRef, {
        uid: user.uid,
        email,
        role,
        createdAt: new Date().toISOString(),
      });
    }

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("This email is already in use. Please log in.");
        case "auth/invalid-email":
          throw new Error("Invalid email format. Please check again.");
        case "auth/weak-password":
          throw new Error(
            "Password is too weak. Please use a stronger password."
          );
        case "auth/operation-not-allowed":
          throw new Error(
            "Sign-up is currently disabled. Please try again later."
          );
        default:
          throw new Error("Registration failed. Please try again.");
      }
    }
    throw new Error("An unexpected error occurred.");
  }
}

/**
 * Signs in an existing user.
 */
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    // Handle Firebase Authentication errors
    console.error(error);
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-email":
        case "auth/invalid-credential":
          throw new Error("Your email or password is not correct.");
        case "auth/user-disabled":
          throw new Error("This account has been disabled.");
        default:
          throw new Error("Login failed. Please try again later.");
      }
    }
    throw new Error("An unexpected error occurred.");
  }
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
