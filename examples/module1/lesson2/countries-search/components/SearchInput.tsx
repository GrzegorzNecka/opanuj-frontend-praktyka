import { debounce } from 'es-toolkit';
import React from 'react';
import { useCallback, useState } from 'react';

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
  value: externalValue,
  placeholder,
  searchValue,
}: SearchInputProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(externalValue);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      searchValue(value);
    }, 100),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setLocalSearchTerm(newValue);
    debouncedSearch(newValue);
  };

  React.useEffect(() => {
    setLocalSearchTerm(externalValue);
  }, [externalValue]);

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        name={name}
        type="text"
        value={localSearchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border"
        aria-label="Search countries"
      />
    </div>
  );
}
