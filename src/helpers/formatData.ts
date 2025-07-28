export function formatDateTime(isoString: string): string {
  const dateObj = new Date(isoString);

  const date = dateObj.toISOString().split("T")[0];

  let hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const time = `${hours}:${formattedMinutes} ${ampm}`;

  return `${date} at ${time}`;
}

export function formatUTCToISTString(input: string): string {
  const utcDate = new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-IN", options).format(utcDate);
}
