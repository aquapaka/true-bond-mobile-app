import { collection, getDocs, query, where } from "firebase/firestore";
import { Review } from "../types/Review";
import { database } from "../lib/firebase";
import { addDocument } from "../lib/firestore";

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

  addReview: async (review: Omit<Review, "id" | "createdAt">) => {
    return addDocument<Review>("reviews", {
      ...review,
    });
  },
};
