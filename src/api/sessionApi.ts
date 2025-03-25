import {
  addDocument,
  getDocument,
  queryCollection,
  updateDocument,
} from "../lib/firestore";
import { Counselor } from "../types/Counselor";
import { CounselorProfile } from "../types/CounselorProfile";
import {
  Session,
  SessionStatus,
  SessionWithClient,
  SessionWithCounselor,
} from "../types/Session";
import { UserData } from "../types/User";
import { userApi } from "./userApi";

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
        sessionPrice,
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

  getAllSessionsWithCounselorInfoByClientId: async (
    clientId: string
  ): Promise<SessionWithCounselor[]> => {
    try {
      // Fetch all sessions for the client
      const sessions = await queryCollection<Session>(
        "sessions",
        "clientId",
        clientId
      );

      // Fetch and merge counselor details
      const sessionsWithCounselor = await Promise.all(
        sessions.map(async (session) => {
          if (!session.counselorId) return { ...session, counselor: null };

          // Get UserData from Users collection
          const userData = await getDocument<UserData>(
            "users",
            session.counselorId
          );

          if (!userData || !userData.counselorProfileId) {
            return { ...session, counselor: null };
          }

          // Get CounselorProfile from CounselorProfiles collection
          const counselorProfile = await getDocument<CounselorProfile>(
            "counselorProfiles",
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

  getAllSessionsWithUserDataByCounselorId: async (
    counselorId: string
  ): Promise<SessionWithClient[]> => {
    try {
      // Fetch all sessions for the counselor
      const sessions = await queryCollection<Session>(
        "sessions",
        "counselorId",
        counselorId
      );

      // Fetch and merge client details
      const sessionsWithClient = await Promise.all(
        sessions.map(async (session) => {
          if (!session.clientId) return { ...session, client: null };

          // Get UserData from Users collection
          const userData = await getDocument<UserData>(
            "users",
            session.clientId
          );

          return { ...session, client: userData || null };
        })
      );

      return sessionsWithClient;
    } catch (error) {
      console.error("Error fetching sessions with client info:", error);
      return [];
    }
  },

  getSessionWithClientById: async (
    sessionId: string
  ): Promise<SessionWithClient | null> => {
    try {
      // Fetch session data
      const session = await getDocument<Session>("sessions", sessionId);
      if (!session) return null;

      // Fetch client data if clientId exists
      let client: UserData | null = null;
      if (session.clientId) {
        client = await userApi.getUserDataById(session.clientId);
      }

      return { ...session, client };
    } catch (error) {
      console.error("Error fetching session with client info:", error);
      return null;
    }
  },

  getSessionWithCounselorById: async (
    sessionId: string
  ): Promise<SessionWithCounselor | null> => {
    try {
      // Fetch session data
      const session = await getDocument<Session>("sessions", sessionId);
      if (!session) return null;

      // Fetch counselor's user data and profile if counselorId exists
      let counselor: Counselor | null = null;
      if (session.counselorId) {
        const userData = await getDocument<UserData>(
          "users",
          session.counselorId
        );
        const counselorProfile = await getDocument<CounselorProfile>(
          "counselorProfiles",
          userData?.counselorProfileId!
        );

        if (userData && counselorProfile) {
          counselor = { ...userData, ...counselorProfile };
        }
      }

      return { ...session, counselor };
    } catch (error) {
      console.error("Error fetching session with counselor info:", error);
      return null;
    }
  },

  updateSession: async (
    sessionId: string,
    partialData: Partial<Session>
  ): Promise<void> => {
    try {
      await updateDocument<Session>("sessions", sessionId, partialData);
      console.log(`Session ${sessionId} updated with:`, partialData);
    } catch (error) {
      console.error("Error updating session:", error);
      throw error;
    }
  },
};
