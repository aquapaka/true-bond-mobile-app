import { doc, updateDoc } from "firebase/firestore";
import { getCollection, getDocument, updateDocument } from "../lib/firestore";
import { Counselor } from "../types/Counselor";
import { CounselorProfile } from "../types/CounselorProfile";
import { UserData } from "../types/User";
import { database } from "../lib/firebase";

export const counselorApi = {
  getCounselor: async (id: string): Promise<Counselor | null> => {
    // Fetch user data
    const user = await getDocument<UserData>("users", id);
    if (!user || !user.counselorProfileId) return null; // Return null if not found or not a counselor

    // Fetch counselor profile
    const profile = await getDocument<CounselorProfile>(
      "counselorProfiles",
      user.counselorProfileId,
    );
    if (!profile) return null; // Return null if profile doesn't exist

    // Merge user & profile data
    return { ...profile, ...user };
  },

  getAllAplliedCounselors: async (): Promise<Counselor[]> => {
    // Fetch all users
    const users = await getCollection<UserData>("users");

    // Filter users who are counselors (have `counselorProfileId`)
    const counselorUsers = users.filter(
      (user) => user.role === "counselor" && user.counselorProfileId,
    );

    // Fetch all counselor profiles
    const profiles = await getCollection<CounselorProfile>("counselorProfiles");

    // Create a Map for quick lookup by `counselorProfileId`
    const profileMap = new Map(
      profiles.map((profile) => [profile.id, profile]),
    );

    // Merge UserData with their corresponding CounselorProfile
    return counselorUsers
      .map((user) => {
        const profile = profileMap.get(user.counselorProfileId!);
        return profile ? { ...profile, ...user } : null;
      })
      .filter((counselor): counselor is Counselor => counselor !== null);
  },

  getAllCounselors: async (): Promise<Counselor[]> => {
    // Fetch all users
    const users = await getCollection<UserData>("users");

    // Filter users who are counselors (have `counselorProfileId`)
    const counselorUsers = users.filter((user) => user.counselorProfileId);

    // Fetch all counselor profiles
    const profiles = await getCollection<CounselorProfile>("counselorProfiles");

    // Create a Map for quick lookup by `counselorProfileId`
    const profileMap = new Map(
      profiles.map((profile) => [profile.id, profile]),
    );

    // Merge UserData with their corresponding CounselorProfile
    return counselorUsers
      .map((user) => {
        const profile = profileMap.get(user.counselorProfileId!);
        return profile ? { ...profile, ...user } : null;
      })
      .filter((counselor): counselor is Counselor => counselor !== null);
  },

  approveCounselor: async (userId: string): Promise<void> => {
    // Fetch user data
    const userData = await getDocument<UserData>("users", userId);
    if (!userData) throw new Error("User not found");

    // Ensure the user has a counselor profile ID
    if (!userData.counselorProfileId)
      throw new Error("User does not have a counselor profile");

    // Update user role to "counselor"
    await updateDocument<UserData>("users", userId, { role: "counselor" });

    // Update counselor status to "applying"
    await updateDocument<CounselorProfile>(
      "counselorProfiles",
      userData.counselorProfileId,
      { status: "approved" },
    );

    console.log(`User ${userId} applied as a counselor`);
  },

  declineCounselor: async (userId: string): Promise<void> => {
    // Fetch user data
    const userData = await getDocument<UserData>("users", userId);
    if (!userData) throw new Error("User not found");

    // Ensure the user has a counselor profile ID
    if (!userData.counselorProfileId)
      throw new Error("User does not have a counselor profile");

    // Update counselor status to "declined"
    await updateDocument<CounselorProfile>(
      "counselorProfiles",
      userData.counselorProfileId,
      { status: "declined" },
    );

    console.log(`User ${userId} application is declined`);
  },
};
