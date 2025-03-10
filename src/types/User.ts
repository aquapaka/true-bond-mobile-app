export type UserRole = "client" | "counselor" | "admin";

export type RelationshipStatus =
  | "Single"
  | "In a Relationship"
  | "Engaged"
  | "Married"
  | "It's Complicated"
  | "Prefer Not to Say";

export interface UserData {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage: string;
  phone: string;
  relationshipStatus: RelationshipStatus;
  counselorId?: string;
  createdAt: Date;
};
