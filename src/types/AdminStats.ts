export interface AdminStats {
  totalUsers: {
    clients: number;
    counselors: number;
  };
  totalSessions: {
    pending: number;
    scheduled: number;
    completed: number;
  };
  totalCounselorProfiles: {
    pendingCounselorProfiles: number;
    approvedCounselorProfiles: number;
    declinedCounselorProfiles: number;
  };
}
