import { database } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";

/** 🔹 Set or Update a document */
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T
) {
  const ref = doc(database, collectionName, id);
  return await setDoc(ref, data, { merge: true });
}

/** 🔹 Get a document */
export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const ref = doc(database, collectionName, id);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? (snapshot.data() as T) : null;
}

/** 🔹 Update a document */
export async function updateDocument<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
) {
  const ref = doc(database, collectionName, id);
  return await updateDoc(ref, data);
}

/** 🔹 Delete a document */
export async function deleteDocument(collectionName: string, id: string) {
  const ref = doc(database, collectionName, id);
  return await deleteDoc(ref);
}

/** 🔹 Add a document (auto ID) */
export async function addDocument<T extends DocumentData>(collectionName: string, data: T) {
  const ref = collection(database, collectionName);
  return await addDoc(ref, data);
}

/** 🔹 Get all documents from a collection */
export async function getCollection<T>(collectionName: string): Promise<T[]> {
  const ref = collection(database, collectionName);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data() as T);
}

/** 🔹 Query documents with filters */
export async function queryCollection<T>(
  collectionName: string,
  field: string,
  value: any
): Promise<T[]> {
  const ref = collection(database, collectionName);
  const q = query(ref, where(field, "==", value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as T);
}
