import { getCollection, getDocument } from "../lib/firestore";
import { Counselor } from "../types/Counselor";
import { CounselorProfile } from "../types/CounselorProfile";
import { UserData } from "../types/User";

export const counselorApi = {
  getCounselor: async (id: string): Promise<Counselor | null> => {
    // Fetch user data
    const user = await getDocument<UserData>("users", id);
    if (!user || !user.counselorProfileId) return null; // Return null if not found or not a counselor

    // Fetch counselor profile
    const profile = await getDocument<CounselorProfile>(
      "counselorProfiles",
      user.counselorProfileId
    );
    if (!profile) return null; // Return null if profile doesn't exist

    // Merge user & profile data
    return { ...user, ...profile };
  },

  getAllCounselors: async (): Promise<Counselor[]> => {
    // Fetch all users
    const users = await getCollection<UserData>("users");

    // Filter users who are counselors (have `counselorProfileId`)
    const counselorUsers = users.filter((user) => user.role === 'counselor' && user.counselorProfileId);

    // Fetch all counselor profiles
    const profiles = await getCollection<CounselorProfile>("counselorProfiles");

    // Create a Map for quick lookup by `counselorProfileId`
    const profileMap = new Map(
      profiles.map((profile) => [profile.id, profile])
    );

    // Merge UserData with their corresponding CounselorProfile
    return counselorUsers
      .map((user) => {
        const profile = profileMap.get(user.counselorProfileId!);
        return profile ? { ...user, ...profile } : null;
      })
      .filter((counselor): counselor is Counselor => counselor !== null);
  },
};
