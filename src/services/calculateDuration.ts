export function calculateDuration(start: string, end: string): string {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const diffMs = endTime.getTime() - startTime.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}h ${minutes}m`;
}
