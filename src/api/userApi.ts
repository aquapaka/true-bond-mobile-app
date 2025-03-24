import { getDocument } from "../lib/firestore";
import { UserData } from "../types/User";

export const userApi = {
  getUserDataById: async (userId: string): Promise<UserData | null> => {
    console.log("Getting userdata by id ", userId);

    return await getDocument<UserData>("users", userId);
  },
};
