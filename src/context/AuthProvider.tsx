import { signOut as firebaseSignOut, User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../lib/firebase";
import { UserData } from "../types/User";

interface AuthContextType {
  user: User | null;
  userData: UserData | null; // Firestore user document
  loading: boolean;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<UserData>) => Promise<void>; // <--- Hàm mới
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log(
        "🔄 Auth state changed inside auth provider:",
        firebaseUser?.email
      );
      setUser(firebaseUser);

      if (firebaseUser) {
        console.log("📡 Fetching user data from Firestore...");
        const userDocRef = doc(database, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserData;
          console.log("✅ User data fetched:", userData);
          setUserData(userData);
        } else {
          console.error(
            "🚨 Firestore document NOT FOUND for user:",
            firebaseUser.uid
          );
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signOut() {
    await firebaseSignOut(auth);
    setUser(null);
    setUserData(null);
  }

  // --- Hàm cập nhật UserData ---
  async function updateUser(updates: Partial<UserData>): Promise<void> {
    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    // Gọi Firestore update
    const docRef = doc(database, "users", user.uid);
    await updateDoc(docRef, updates);

    // Cập nhật state userData tại chỗ (để UI không cần reload)
    setUserData((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, userData, loading, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook access AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
