import { useState } from 'react';
import { useCountriesSearch } from '../hooks/useCountriesSearch';
import { SortingSelect } from '../components/SortingSelect';
import { SearchInput } from '../components/SearchInput';
import { CountriesList } from '../components/CountriesList';
import { FilterInput } from '../components/FilterInput';
import type { CountryFilters } from '../services/types';
import type { SortOption } from '../services/sortCountries';

function CountrySearchContainers() {
  const [name, setName] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [CountryFilters, setCountryFilters] = useState<CountryFilters>({
    region: '',
    language: '',
    currency: '',
    capital: '',
  });

  const { countries } = useCountriesSearch(name, sortOption, CountryFilters);

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
          name="name"
          value={name}
          onChange={setName}
        />

        <FilterInput
          label="Region"
          name="region"
          value={CountryFilters.region || ''}
          onChange={handleFilterChange}
        />

        <FilterInput
          label="Language"
          name="language"
          value={CountryFilters.language || ''}
          onChange={handleFilterChange}
        />

        <FilterInput
          label="Currency"
          name="currency"
          value={CountryFilters.currency || ''}
          onChange={handleFilterChange}
        />

        <FilterInput
          label="Capital"
          name="capital"
          value={CountryFilters.capital || ''}
          onChange={handleFilterChange}
        />

        <SortingSelect value={sortOption} onChange={setSortOption} />
      </form>

      <CountriesList countries={countries} />
    </>
  );
}

export default CountrySearchContainers;
