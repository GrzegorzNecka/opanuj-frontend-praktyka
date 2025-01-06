interface SearchTitleProps {
  name?: string;
}

function SearchTitle({ name = 'Rick and Morthy' }: SearchTitleProps) {
  return (
    <h1 className="text-4xl font-bold text-center">Search Characters {name}</h1>
  );
}

export default SearchTitle;
