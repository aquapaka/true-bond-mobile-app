export type LearningResourceCategory =
  | "Communication"
  | "Finances"
  | "Conflict Resolution"
  | "Married Life";

export interface LearningResource {
  id: string; // Firestore Auto ID
  title: string;
  imageUrl: string;
  content: string;
  category: string;
  author: string;
  authorImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
