'use client';

import { useEffect, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}

export default function SearchBar({ value, onChange, delay = 250 }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [localValue, value, onChange, delay]);

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
        Поиск по гайдам
        <input
          type="search"
          placeholder="Пустыня, метро, прогулка..."
          value={localValue}
          onChange={(event) => setLocalValue(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
        />
      </label>
    </div>
  );
}
