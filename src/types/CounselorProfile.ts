export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeSlot =
  | "00:00"
  | "01:00"
  | "02:00"
  | "03:00"
  | "04:00"
  | "05:00"
  | "06:00"
  | "07:00"
  | "08:00"
  | "09:00"
  | "10:00"
  | "11:00"
  | "12:00"
  | "13:00"
  | "14:00"
  | "15:00"
  | "16:00"
  | "17:00"
  | "18:00"
  | "19:00"
  | "20:00"
  | "21:00"
  | "22:00"
  | "23:00";

export interface BookingSlot {
  day: Weekday;
  slots: TimeSlot[];
  available?: boolean;
}

export type CounselorStatus =
  | "notApplied" // Hasn't applied yet
  | "applying" // Waiting for admin approval
  | "approved" // Approved as a counselor
  | "declined"; // Application was rejected

export interface CounselorProfile {
  id: string;
  userId: string;
  bio: string; // Short introduction
  expertise: string; // Areas of expertise (e.g., ["communication", "finance"])
  experienceYears: number;
  educationDetails: string;
  experienceDetails: string;
  certificateImageUrl: string;
  sessionPrice: number;
  availability: BookingSlot[];
  rating: number; // Average rating (based on reviews)
  status: CounselorStatus;
  createdAt: Date;
}
