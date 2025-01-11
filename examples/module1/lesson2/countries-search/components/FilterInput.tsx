// import type { CountryFilters } from './services/types';

import type { CountryFilters } from '../services/types';

interface FilterInputProps {
  label: string;
  name: keyof CountryFilters;
  value: string;
  onChange: (name: keyof CountryFilters, value: string) => void;
}

export function FilterInput({
  label,
  name,
  value,
  onChange,
}: FilterInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        type="text"
        id={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value.trim())}
        className="border rounded px-3 py-1.5"
      />
    </div>
  );
}
