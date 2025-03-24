import { addDocument, getDocument, queryCollection } from "../lib/firestore";
import { Counselor } from "../types/Counselor";
import { CounselorProfile } from "../types/CounselorProfile";
import { Session, SessionStatus, SessionWithCounselor } from "../types/Session";
import { UserData } from "../types/User";

export const sessionApi = {
  createNewSession: async (
    clientId: string,
    counselorId: string,
    meetLink: string,
    scheduledAt: Date,
    notes: string,
    sessionPrice: number
  ): Promise<Session | null> => {
    try {
      const newSession: Omit<Session, "id" | "createdAt" | "updatedAt"> = {
        clientId,
        counselorId,
        meetLink,
        scheduledAt, // Firestore will handle conversion to Timestamp
        status: "pending" as SessionStatus,
        notes,
        sessionPrice
      };

      const createdSession = await addDocument<Session>("sessions", newSession);

      return createdSession;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  },
  getActiveSession: async (
    clientId: string,
    counselorId: string
  ): Promise<Session | null> => {
    try {
      // Query Firestore for sessions with the given client
      const sessions = await queryCollection<Session>(
        "sessions",
        "clientId",
        clientId
      );

      // Find a session that is either "pending" or "confirmed" with the same counselor
      const activeSession = sessions.find(
        (session) =>
          session.counselorId === counselorId &&
          (session.status === "pending" || session.status === "confirmed")
      );

      return activeSession || null;
    } catch (error) {
      console.error("Error checking active sessions:", error);
      return null;
    }
  },

  getAllSessionsWithCounselorInfo: async (
    clientId: string
  ): Promise<SessionWithCounselor[]> => {
    try {
      // Fetch all sessions for the client
      const sessions = await queryCollection<Session>(
        'sessions',
        "clientId",
        clientId
      );

      // Fetch and merge counselor details
      const sessionsWithCounselor = await Promise.all(
        sessions.map(async (session) => {
          if (!session.counselorId) return { ...session, counselor: null };

          // Get UserData from Users collection
          const userData = await getDocument<UserData>(
            'users',
            session.counselorId
          );

          if (!userData || !userData.counselorProfileId) {
            return { ...session, counselor: null };
          }

          // Get CounselorProfile from CounselorProfiles collection
          const counselorProfile = await getDocument<CounselorProfile>(
            'counselorProfiles',
            userData.counselorProfileId
          );

          if (!counselorProfile) {
            return { ...session, counselor: null };
          }

          // Combine user and profile into a Counselor type
          const counselor: Counselor = {
            ...userData,
            ...counselorProfile,
          };

          return { ...session, counselor };
        })
      );

      return sessionsWithCounselor;
    } catch (error) {
      console.error("Error fetching sessions with counselor info:", error);
      return [];
    }
  },
};
