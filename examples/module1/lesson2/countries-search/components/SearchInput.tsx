import { debounce } from 'es-toolkit';
import { useCallback } from 'react';

interface SearchInputProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  searchValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchInput({
  label,
  name,
  value,
  placeholder,
  searchValue,
}: SearchInputProps) {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      searchValue(value);
    }, 100),
    []
  );

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={(e) => debouncedSearch(e.target.value.trim())}
        placeholder={placeholder}
        className="p-2 border rounded"
        aria-label="Search countries"
      />
    </div>
  );
}
