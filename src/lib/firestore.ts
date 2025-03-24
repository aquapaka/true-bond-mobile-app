import { CollectionName } from "../types/CollectionName";
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
  serverTimestamp,
} from "firebase/firestore";

/** 🔹 Set or Update a document */
export async function setDocument<T extends DocumentData>(
  collectionName: CollectionName,
  id: string,
  data: T,
) {
  const ref = doc(database, collectionName, id);
  return await setDoc(ref, data, { merge: true });
}

/** 🔹 Get a document */
export async function getDocument<T>(
  collectionName: CollectionName,
  id: string,
): Promise<T | null> {
  console.log("Getting document from " + collectionName);

  const ref = doc(database, collectionName, id);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? (snapshot.data() as T) : null;
}

/** 🔹 Update a document */
export async function updateDocument<T>(
  collectionName: CollectionName,
  id: string,
  data: Partial<T>,
) {
  const ref = doc(database, collectionName, id);
  return await updateDoc(ref, data);
}

/** 🔹 Delete a document */
export async function deleteDocument(
  collectionName: CollectionName,
  id: string,
) {
  const ref = doc(database, collectionName, id);
  return await deleteDoc(ref);
}

/** 🔹 Add a document (auto ID) */
export async function addDocument<T extends DocumentData & { id: string }>(
  collectionName: CollectionName,
  data: Omit<T, "id" | "createdAt" | "updatedAt">, // Prevent manually setting the ID
): Promise<T> {
  const ref = collection(database, collectionName);
  const docRef = await addDoc(ref, data); // Add document without `id`

  console.log("Adding document to " + collectionName);

  // Update Firestore with the generated ID
  await updateDoc(docRef, {
    id: docRef.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Return the data with the `id` included
  return { ...data, id: docRef.id } as T;
}

/** 🔹 Get all documents from a collection */
export async function getCollection<T>(
  collectionName: CollectionName,
): Promise<T[]> {
  const ref = collection(database, collectionName);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data() as T);
}

/** 🔹 Query documents with filters */
export async function queryCollection<T>(
  collectionName: CollectionName,
  field: string,
  value: any,
): Promise<T[]> {
  const ref = collection(database, collectionName);
  const q = query(ref, where(field, "==", value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as T);
}
