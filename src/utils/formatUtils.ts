export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(",", "")
    .replace(/(\d{2}) (\w{3})/, "$2 $1")
    .replace(" AM", " AM")
    .replace(" PM", " PM");
}

export function formatShortDate(date: Date | string | number): string {
  const d = new Date(date); // Ensure it's a Date object
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
