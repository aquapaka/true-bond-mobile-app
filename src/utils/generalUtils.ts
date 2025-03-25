import { Timestamp } from "firebase/firestore";

export const getReadingTime = (content: string): string => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

export function calculateAvgRating(ratings: number[]): number {
  return ratings.reduce((pre, curr) => pre + curr, 0) / ratings.length;
}

export function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function hasTimePassed(
  timestamp: Timestamp | string | number | Date
): boolean {
  let targetTime: number;

  if (timestamp instanceof Timestamp) {
    targetTime = timestamp.toMillis(); // Convert Firebase Timestamp to milliseconds
  } else {
    targetTime = new Date(timestamp).getTime(); // Convert other types to milliseconds
  }

  return Date.now() > targetTime;
}
