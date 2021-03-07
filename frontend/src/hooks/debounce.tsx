import { useEffect, useState } from 'react';

export default function Debounce<D>(value: D | null): D | null {
  const [debouncedValue, setDebouncedValue] = useState<D | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
}
