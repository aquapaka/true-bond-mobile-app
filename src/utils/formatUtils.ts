import { formatRelative } from "date-fns";

export function formatDate(
  input: Date | { seconds: number; nanoseconds: number }
): string {
  // Convert Firestore Timestamp to Date if necessary
  const date = input instanceof Date ? input : new Date(input.seconds * 1000);

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Ensures correct local timezone
  }).format(date);
}

export function formatShortDate(date: Date | string | number): string {
  const d = new Date(date); // Ensure it's a Date object
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatTwoDecimal(number: number) {
  return Math.round(number * 100) / 100;
}

export function formatRelativeDate(
  input: Date | { seconds: number; nanoseconds: number }
): string {
  // Convert Firestore Timestamp to Date if necessary
  const date = input instanceof Date ? input : new Date(input.seconds * 1000);
  const now = new Date();

  // Get the difference in days (ignoring time differences)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Determine output
  if (diffDays < 0) {
    return "Late";
  } else if (diffDays === 0) {
    return `Today at ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else {
    return `${diffDays} days left`;
  }
}
