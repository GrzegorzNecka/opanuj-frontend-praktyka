import type { SortOption } from '../services/sortCountries';

interface SortingSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortingSelect({ value, onChange }: SortingSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="p-2 border rounded"
    >
      <option value="name">Sort by name</option>
      <option value="population">Sort by population</option>
    </select>
  );
}
