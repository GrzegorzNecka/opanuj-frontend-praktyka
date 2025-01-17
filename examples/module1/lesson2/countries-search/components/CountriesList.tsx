import type { Country } from '../api/types';
import { CountriesListItem } from './CountriesListItem';

interface CountriesListProps {
  countries: Country[];
}

export const CountriesList = ({ countries }: CountriesListProps) => {
  return (
    <>
      {countries.length > 0 && (
        <ul className="countries-grid grid grid-cols-2 gap-4 p-4">
          {countries.map((country) => (
            <CountriesListItem key={country.name.common} country={country} />
          ))}
        </ul>
      )}
    </>
  );
};
