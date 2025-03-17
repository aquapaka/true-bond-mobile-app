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
