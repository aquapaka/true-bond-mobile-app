import { collection, getDocs, query, where } from "firebase/firestore";
import { Review } from "../types/Review";
import { database } from "../lib/firebase";

export const reviewApi = {
  getReviewsByCounselorId: async (counselorId: string) => {
    const ref = collection(database, "reviews");
    const q = query(ref, where("counselorId", "==", counselorId));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  },
};
