import {
  fetchAllCountries,
  fetchCountriesByCapital,
  fetchCountriesByCurrency,
  fetchCountriesByLanguage,
  fetchCountriesByName,
} from './apiClient';
import { createCache } from './cache';
import type { Country } from './types';

type ApiClientFn = {
  fetchAllCountries: () => Promise<Country[]>;
  fetchCountriesByName: (name: string) => Promise<Country[]>;
  fetchCountriesByCapital: (capital: string) => Promise<Country[]>;
  fetchCountriesByCurrency: (currency: string) => Promise<Country[]>;
  fetchCountriesByLanguage: (language: string) => Promise<Country[]>;
};

/**
 * Creates an API client with caching capabilities.
 * Wraps the base API client functions with a caching layer.
 * @returns Object containing cached versions of API methods
 */
export const apiClientWithCaching = (): ApiClientFn => {
  const cache = createCache();

  const fetchStrategies = {
    name: fetchCountriesByName,
    capital: fetchCountriesByCapital,
    currency: fetchCountriesByCurrency,
    language: fetchCountriesByLanguage,
    all: fetchAllCountries,
  };

  /**
   * Generic function that handles caching logic for all API calls
   * @param type - The type of search (name, capital, currency, language, or all)
   * @param value - The search value (optional)
   * @returns Promise resolving to an array of Country objects
   */

  const withCaching = async (
    type: keyof typeof fetchStrategies,
    value: string = ''
  ) => {
    const cacheKey = `${type}_${value}`;

    if (cache.hasCache(cacheKey)) {
      return cache.getFromCache(cacheKey) as Country[];
    }

    const fetchFn = fetchStrategies[type];
    const data =
      type === 'all'
        ? await fetchFn('')
        : value
        ? await fetchFn(value)
        : await fetchFn('');

    cache.setCache(cacheKey, data);
    return data;
  };

  return {
    fetchAllCountries: () => withCaching('all'),
    fetchCountriesByName: (name) => withCaching('name', name),
    fetchCountriesByCapital: (capital) => withCaching('capital', capital),
    fetchCountriesByCurrency: (currency) => withCaching('currency', currency),
    fetchCountriesByLanguage: (language) => withCaching('language', language),
  };
};
