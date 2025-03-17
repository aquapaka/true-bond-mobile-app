export type SessionStatus = "pending" | "confirmed" | "completed" | "canceled";

export interface Session {
  id: string; // Auto-generated Firestore ID
  clientId: string; // Links to a client
  counselorId: string; // Links to a counselor
  meetLink: string; // Google Meet URL
  scheduledAt: Date;
  status: SessionStatus;
  notes: string;
}
