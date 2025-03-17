export type LearningResourceCategory = "communication" | "finances" | "conflict_resolution";

export interface LearningResource {
  id: string; // Firestore Auto ID
  title: string;
  imageUrl: string;
  content: string;
  category: LearningResourceCategory;
  author: string;
  authorImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
