import { useState } from 'react';
import { useCountriesSearch } from '../hooks/useCountriesSearch';
import { SortingSelect } from '../components/SortingSelect';
import { SearchInput } from '../components/SearchInput';
import { FilterInput } from '../components/FilterInput';
import type { CountryFilters } from '../services/types';
import type { SortOption } from '../services/sortCountries';
import { CountriesListContainer } from './CountriesListContainer';

const FILTER_FIELDS = [
  { label: 'Region', name: 'region' },
  { label: 'Language', name: 'language' },
  { label: 'Currency', name: 'currency' },
  { label: 'Capital', name: 'capital' },
] as const;

function CountrySearchContainers() {
  const [name, setName] = useState('');

  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [countryFilters, setCountryFilters] = useState<CountryFilters>({
    region: '',
    language: '',
    currency: '',
    capital: '',
  });

  const { countries, isLoading, error } = useCountriesSearch(
    name,
    sortOption,
    countryFilters
  );

  const handleFilterChange = (name: keyof CountryFilters, value: string) => {
    setCountryFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className="text-center py-4">Countries Search</h1>
      <form className="flex gap-4 mb-4">
        <SearchInput
          label="Search"
          placeholder="Search by country's name..."
          name="name"
          value={name}
          onChange={setName}
        />

        {FILTER_FIELDS.map((field) => (
          <FilterInput
            key={field.name}
            label={field.label}
            name={field.name}
            value={countryFilters[field.name] || ''}
            onChange={handleFilterChange}
          />
        ))}

        <SortingSelect value={sortOption} onChange={setSortOption} />
      </form>

      <CountriesListContainer
        countries={countries}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

export default CountrySearchContainers;
