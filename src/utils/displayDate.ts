export function displayFullDate(timestamp: string) {
  const date = new Date(+timestamp * 1000);
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
  const date = new Date(+timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  };

  return date.toLocaleString('ru', options);
}
