import { calculateDuration } from "../calculateDuration";

describe('calculateDuration', () => {
  it('returns correct duration for same day time difference', () => {
    const start = '2025-07-22T08:00:00Z';
    const end = '2025-07-22T11:45:00Z';
    expect(calculateDuration(start, end)).toBe('3h 45m');
  });

  it('returns correct duration across midnight', () => {
    const start = '2025-07-22T22:30:00Z';
    const end = '2025-07-23T01:15:00Z';
    expect(calculateDuration(start, end)).toBe('2h 45m');
  });

  it('returns 0h 0m when times are equal', () => {
    const time = '2025-07-22T10:00:00Z';
    expect(calculateDuration(time, time)).toBe('0h 0m');
  });

  it('returns correct duration over multiple days', () => {
    const start = '2025-07-20T10:00:00Z';
    const end = '2025-07-22T10:00:00Z';
    expect(calculateDuration(start, end)).toBe('48h 0m');
  });

  it('handles minutes only', () => {
    const start = '2025-07-22T10:00:00Z';
    const end = '2025-07-22T10:30:00Z';
    expect(calculateDuration(start, end)).toBe('0h 30m');
  });
});
