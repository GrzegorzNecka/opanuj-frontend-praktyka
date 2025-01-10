import { useState } from 'react';
import { useCountriesSearch } from './hooks/useCountriesSearch';
import { SortingSelect } from './components/SortingSelect';
import { SearchInput } from './components/SearchInput';
import { CountriesList } from './components/CountriesList';
import { CountriesListItem } from './components/CountriesListItem';

export type SortOption = 'name' | 'population' | 'area' | 'region' | 'currency';

function CountrySearchContainers() {
  const [name, setName] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const { countries } = useCountriesSearch(name, sortOption);

  return (
    <>
      <h1 className="text-center py-4">Countries Search</h1>
      <form className="flex gap-4 mb-4">
        <SearchInput value={name} onChange={setName} />
        <SortingSelect value={sortOption} onChange={setSortOption} />
      </form>
      <CountriesList countries={countries}>
        {(country) => <CountriesListItem country={country} />}
      </CountriesList>
    </>
  );
}

export default CountrySearchContainers;
