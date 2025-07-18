 export function formatDateTime(isoString: string): string {
    const dateObj = new Date(isoString);
    const date = dateObj.toISOString().split("T")[0];
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12; 
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const time = `${formattedHour}:${formattedMinutes} ${ampm}`;
    return `${date} at ${time}`;
  }