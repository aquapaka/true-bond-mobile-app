export type LearningResourceCategory = "communication" | "finances" | "conflict_resolution";

export interface LearningResource {
  resourceId: string; // Firestore Auto ID
  title: string;
  content: string;
  category: LearningResourceCategory;
  createdAt: Date;
}
