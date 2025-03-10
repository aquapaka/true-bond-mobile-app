import { signOut as firebaseSignOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../lib/firebase";
import { UserData } from "../types/User";

interface AuthContextType {
  user: User | null;
  userData: UserData | null; // Firestore user document
  loading: boolean;
  signOut: () => Promise<void>;
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

  return (
    <AuthContext.Provider value={{ user, userData, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
