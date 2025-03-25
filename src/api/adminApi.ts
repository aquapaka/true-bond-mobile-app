import { queryCollection } from "../lib/firestore";
import { AdminStats } from "../types/AdminStats";
import { CounselorProfile } from "../types/CounselorProfile";
import { Session } from "../types/Session";
import { UserData } from "../types/User";

export const adminApi = {
  getAdminStats: async (): Promise<AdminStats> => {
    // Get total users (clients & counselors)
    const clients = await queryCollection<UserData>("users", "role", "client");
    const counselors = await queryCollection<UserData>(
      "users",
      "role",
      "counselor"
    );

    // Get active sessions
    const pendingSessions = await queryCollection<Session>(
      "sessions",
      "status",
      "pending"
    );
    const scheduledSessions = await queryCollection<Session>(
      "sessions",
      "status",
      "confirmed"
    );
    const completedSessions = await queryCollection<Session>(
      "sessions",
      "status",
      "completed"
    );

    // Get pending approvals (counselor applications & reports)
    const pendingCounselorProfiles = await queryCollection<CounselorProfile>(
      "counselorProfiles",
      "status",
      "applying"
    );
    const approvedCounselorProfiles = await queryCollection<CounselorProfile>(
      "counselorProfiles",
      "status",
      "approved"
    );
    const declinedCounselorProfiles = await queryCollection<CounselorProfile>(
      "counselorProfiles",
      "status",
      "declined"
    );

    return {
      totalUsers: {
        clients: clients.length,
        counselors: counselors.length,
      },
      totalSessions: {
        pending: pendingSessions.length,
        scheduled: scheduledSessions.length,
        completed: completedSessions.length,
      },
      totalCounselorProfiles: {
        pendingCounselorProfiles: pendingCounselorProfiles.length,
        approvedCounselorProfiles: approvedCounselorProfiles.length,
        declinedCounselorProfiles: declinedCounselorProfiles.length,
      },
    };
  },
};
