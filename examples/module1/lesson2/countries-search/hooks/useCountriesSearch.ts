import { useState, useEffect } from 'react';
import type { Countries } from '../services/types';
import { fetchCountries } from '../services';
import { sortCountries, type SortOption } from '../services/sortCountries';

import type { CountryFilters } from '../services/types';

export function useCountriesSearch(
  searchTerm: string,
  sortOption: SortOption,
  CountryFilters: CountryFilters
) {
  const [countries, setCountries] = useState<Countries>([]);

  useEffect(() => {
    if (searchTerm) {
      fetchCountries(searchTerm, CountryFilters)
        .then((data: Countries) => setCountries(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [searchTerm, ...Object.values(CountryFilters)]);

  const sortedCountries = sortCountries(countries, sortOption);

  return { countries: sortedCountries };
}
