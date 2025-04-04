import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQWlIpwNZ0zfFJYQNn7aV9mz8oy1JfJuU",
  authDomain: "wasabi-true-bond.firebaseapp.com",
  projectId: "wasabi-true-bond",
  storageBucket: "wasabi-true-bond.firebasestorage.app",
  messagingSenderId: "1038526175672",
  appId: "1:1038526175672:web:51c430df65ce317fda574d",
  measurementId: "G-M5BB47DSTR",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);
export const database = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
