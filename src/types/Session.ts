import { Counselor } from "./Counselor";
import { UserData } from "./User";

export type SessionStatus = "pending" | "confirmed" | "completed" | "canceled";

export interface Session {
  id: string; // Auto-generated Firestore ID
  clientId: string; // Links to a client
  counselorId: string; // Links to a counselor
  meetLink: string; // Google Meet URL
  scheduledAt: Date;
  status: SessionStatus;
  sessionPrice: number;
  notes: string;
  createdAt: Date;
}

export interface SessionWithCounselor extends Session {
  counselor: Counselor | null;
}

export interface SessionWithClient extends Session {
  client: UserData | null;
}
