import { User } from "./User";

export interface Counselor extends User {
  role: "counselor"; // Fixed role
  bio: string; // Short introduction
  expertise: string[]; // Areas of expertise (e.g., ["communication", "finance"])
  experienceYears: number;
  availability: {
    // Weekly availability for booking
    day: string; // e.g., "Monday"
    slots: string[]; // Time slots (e.g., ["10:00 AM", "2:00 PM"])
  }[];
  rating: number; // Average rating (based on reviews)
  approved: boolean; // Whether admin approved them
  createdAt: Date;
}
