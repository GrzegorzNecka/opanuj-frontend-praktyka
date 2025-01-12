interface SearchInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder={placeholder}
        className="p-2 border rounded"
        aria-label="Search countries"
      />
    </div>
  );
}
