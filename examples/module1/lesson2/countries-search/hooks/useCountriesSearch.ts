import { useState, useEffect } from 'react';
import type { Countries } from '../services/types';
import { fetchCountries } from '../services';
import { sortCountries } from '../utils/sortCountries';
import type { SortOption } from '../SearchContainers';

export function useCountriesSearch(searchTerm: string, sortOption: SortOption) {
  const [countries, setCountries] = useState<Countries>([]);

  useEffect(() => {
    if (searchTerm) {
      fetchCountries(searchTerm)
        .then((data: Countries) => setCountries(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [searchTerm]);

  const sortedCountries = sortCountries(countries, sortOption);

  return { countries: sortedCountries };
}
