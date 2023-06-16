import { useEffect, useState } from 'react';

export default function useDebounce(value: string, milliSeconds: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => clearTimeout(timer);
  }, [value, milliSeconds]);

  return debouncedValue;
}
