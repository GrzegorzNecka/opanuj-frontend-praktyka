type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button = ({ onClick, children, className = '' }: ButtonProps) => {
  const baseClasses =
    'bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md';

  return (
    <button className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
