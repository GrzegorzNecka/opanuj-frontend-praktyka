import type { Country } from '../types';

interface CountriesListProps {
  countries: Country[];
  children: (country: Country) => React.ReactNode;
}

export const CountriesList = ({ countries, children }: CountriesListProps) => {
  if (countries.length === 0) {
    return <p className="text-left">No countries found</p>;
  }

  return (
    <ul className="countries-grid grid grid-cols-2 gap-4 p-4">
      {countries.map((country) => (
        <li key={country.name.common}>{children(country)}</li>
      ))}
    </ul>
  );
};
