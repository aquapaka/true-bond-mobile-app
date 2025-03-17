export type UserRole = "client" | "counselor" | "admin";

export type UserGender = "Male" | "Female" | "Other";

export type SubscriptionPlan = "free" | "premium" | "lifetime";

export type RelationshipStatus =
  | "Single"
  | "In a Relationship"
  | "Engaged"
  | "Married"
  | "It's Complicated"
  | "Prefer Not to Say";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage: string;
  phone: string;
  relationshipStatus: RelationshipStatus;
  counselorProfileId?: string;
  dateOfBirth?: Date;
  gender?: UserGender;
  notificationsEnabled?: boolean; // User's notification preferences
  partnerId?: string; // UID of their partner
  relationshipStartDate?: Date; // How long they've been together
  subscriptionPlan?: SubscriptionPlan;
  subscriptionExpiry?: Date; // If using a paid plan
  createdAt: Date;
};
