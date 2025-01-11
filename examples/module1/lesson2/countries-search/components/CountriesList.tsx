import type { Country } from '../services/types';
import { CountriesListItem } from './CountriesListItem';

interface CountriesListProps {
  countries: Country[];
}

export const CountriesList = ({ countries }: CountriesListProps) => {
  if (countries.length === 0) {
    return <p className="text-left">No countries found</p>;
  }

  return (
    <ul className="countries-grid grid grid-cols-2 gap-4 p-4">
      {countries.map((country) => (
        <CountriesListItem key={country.name.common} country={country} />
      ))}
    </ul>
  );
};
