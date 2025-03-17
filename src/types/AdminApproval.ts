export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface AdminApproval {
  id: string; // Firestore Auto ID
  counselorId: string; // Links to the counselor
  adminId: string; // Admin who approved/rejected
  status: ApprovalStatus;
  reason?: string; // Optional reason if rejected
  reviewedAt: Date;
}
