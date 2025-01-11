import { useState, useEffect } from 'react';
import type { Countries } from '../services/types';
import { fetchCountries } from '../services';
import { sortCountries, type SortOption } from '../services/sortCountries';
import type { CountryFilters } from '../services/types';

export function useCountriesSearch(
  searchTerm: string,
  sortOption: SortOption,
  countryFilters: CountryFilters
) {
  const [countries, setCountries] = useState<Countries>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      if (!searchTerm) {
        setCountries([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCountries(searchTerm, countryFilters);
        const sortedData = sortCountries(data, sortOption);
        setCountries(sortedData);
      } catch (error) {
        setError(error as Error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountriesData();
  }, [searchTerm, sortOption, ...Object.values(countryFilters)]);

  return {
    countries,
    isLoading,
    error,
  };
}
