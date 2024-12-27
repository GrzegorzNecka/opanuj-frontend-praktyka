type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const NumberInput = ({ value, onChange, className = '' }: NumberInputProps) => {
  return (
    <input
      type="number"
      className={`rounded-md shadow-md p-4 ${className}`}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};

export default NumberInput;
