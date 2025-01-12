import { useState, useEffect } from 'react';
import type { Countries } from '../services/types';
import { getCountries } from '../services';
import { sortCountries, type SortOption } from '../services/sortCountries';
import type { CountryFilters } from '../services/types';
import type { SearchConfig } from '../services/types';

export function useCountriesSearch(
  searchConfig: SearchConfig,
  sortOption: SortOption,
  countryFilters: CountryFilters
) {
  const [countries, setCountries] = useState<Countries>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCountriesData = async () => {
      if (!searchConfig.term) {
        setCountries([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        //TODO przekaż obiekt
        const data = await getCountries(
          searchConfig.type,
          searchConfig.term,
          countryFilters
        );
        const sortedData = sortCountries(data, sortOption);
        setCountries(sortedData);
      } catch (error) {
        setError(new Error(`Failed to fetch countries`));
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    getCountriesData();
  }, [
    sortOption,
    ...Object.values(searchConfig),
    ...Object.values(countryFilters),
  ]);

  return { countries, isLoading, error };
}
