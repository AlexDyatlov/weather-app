import { displayDate, displayFullDate } from './displayDate';

const timestamp = '1628258400000';
const invalidTimestamp = 'invalid-timestamp';

describe('displayFullDate', () => {
  it('should return full date and time for a valid timestamp', () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    };

    const expectedDate = new Date(+timestamp).toLocaleString('ru', options);
    expect(displayFullDate(timestamp)).toBe(expectedDate);
  });

  it('should handle an invalid timestamp', () => {
    expect(displayFullDate(invalidTimestamp)).toBe('Некорректный timestamp');
  });
});

describe('displayDate', () => {
  it('should return only month, day, weekday for a valid timestamp', () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    };

    const expectedDate = new Date(+timestamp).toLocaleString('ru', options);
    expect(displayDate(timestamp)).toBe(expectedDate);
  });

  it('should handle an invalid timestamp', () => {
    expect(displayDate(invalidTimestamp)).toBe('Некорректный timestamp');
  });
});
