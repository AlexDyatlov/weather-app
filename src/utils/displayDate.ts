function isValidTimestamp(timestamp: string) {
  const date = new Date(+timestamp);
  return !isNaN(date.getTime());
}

export function displayFullDate(timestamp: string) {
  if (!isValidTimestamp(timestamp)) {
    return 'Некорректный timestamp';
  }

  const date = new Date(+timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric'
  };

  return date.toLocaleString('ru', options);
}

export function displayDate(timestamp: string) {
  if (!isValidTimestamp(timestamp)) {
    return 'Некорректный timestamp';
  }

  const date = new Date(+timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  };

  return date.toLocaleString('ru', options);
}
