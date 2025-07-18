export function formatDateTime(isoString: string): string {
  const dateObj = new Date(isoString);
  const offsetInMinutes = 5 * 60 + 30;
  const localTimestamp = dateObj.getTime() + offsetInMinutes * 60 * 1000;
  const localDate = new Date(localTimestamp);

  const date = localDate.toISOString().split("T")[0];

  let hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const time = `${hours}:${formattedMinutes} ${ampm}`;

  return `${date} at ${time}`;
}
