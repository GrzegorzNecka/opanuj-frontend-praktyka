import { useEffect, useState } from 'react';
import {
  fetchAllCountries,
  fetchCountriesByCapital,
  fetchCountriesByCurrency,
  fetchCountriesByLanguage,
  fetchCountriesByName,
} from '../api/apiClient';
import type { FilterType } from '../types';
import type { Country } from '../services/types';

const useFetchCountries = (searchTerm: string, filterType: FilterType) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStrategies = {
      name: fetchCountriesByName,
      currency: fetchCountriesByCurrency,
      language: fetchCountriesByLanguage,
      capital: fetchCountriesByCapital,
      default: fetchAllCountries,
    };

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchFn =
          searchTerm === ''
            ? fetchAllCountries
            : fetchStrategies[filterType] ?? fetchStrategies.default;

        const data = await fetchFn(searchTerm);
        setCountries(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, filterType]);

  return {
    countries,
    isLoading,
    error,
  };
};

export default useFetchCountries;
