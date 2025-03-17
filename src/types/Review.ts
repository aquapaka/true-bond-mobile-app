export interface Review {
  id: string; // Firestore Auto ID
  sessionId: string; // Links to a completed session
  clientId: string; // Who wrote the review
  counselorId: string; // Who received the review
  rating: number; // 1 to 5 stars
  comment?: string; // Optional written feedback
  createdAt: Date;
}
