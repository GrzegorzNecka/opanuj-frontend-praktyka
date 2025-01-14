import { useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import type { FilterType, SortOrder } from '../services/types';
import { CountriesListContainer } from './CountriesListContainer';
import useFetchCountries from '../hooks/useFetchCountries';
import React from 'react';

function CountrySearchContainers() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('alphabetical');
  const [filterType, setFilterType] = useState<FilterType>('name');
  const { countries, isLoading, error } = useFetchCountries(
    searchTerm,
    filterType
  );

  const sortedCountries = React.useMemo(() => {
    if (!countries) return [];
    const sorted = [...countries];
    if (sortOrder === 'alphabetical') {
      sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOrder === 'population') {
      sorted.sort((a, b) => (b.population || 0) - (a.population || 0));
    }
    return sorted;
  }, [countries, sortOrder]);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <label htmlFor={filterType} className="text-sm font-medium">
          search config
        </label>

        <select
          name="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          className="p-2 border rounded-md"
          aria-label="Select search filter type"
        >
          <option value="name">Search by name</option>
          <option value="currency">Search by currency</option>
          <option value="language">Search by language</option>
          <option value="capital">Search by capital</option>
        </select>

        <SearchInput
          label={`Search by ${filterType}`}
          placeholder={`Search by ${filterType}...`}
          name={filterType}
          value={searchTerm}
          searchValue={setSearchTerm}
        />
        <label htmlFor="sortType" className="text-sm font-medium">
          sortBy
        </label>
        <select
          name="sortType"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="p-2 border rounded-md"
          aria-label="Select sort order"
        >
          <option value="alphabetical">Sort alphabetically</option>
          <option value="population">Sort by population</option>
        </select>
      </div>

      <CountriesListContainer
        countries={sortedCountries}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

export default CountrySearchContainers;
