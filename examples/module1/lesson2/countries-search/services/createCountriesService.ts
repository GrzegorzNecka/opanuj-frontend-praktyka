import type { Countries, CountryFilters, SearchType } from './types';
import type { createCacheService } from './cacheService';
import type { createCountriesAPI } from './countriesAPI';
import type { createFilterService } from './filterService';

type Dependencies = {
  api: ReturnType<typeof createCountriesAPI>;
  cache: ReturnType<typeof createCacheService>;
  filter?: ReturnType<typeof createFilterService>;
};

export const createCountriesService = (dependencies: Dependencies) => {
  const { api, cache, filter } = dependencies;
  //helper function
  const validateInput = (type: SearchType, term: string): boolean =>
    Boolean(
      type && term && typeof type === 'string' && typeof term === 'string'
    );

  //helper function
  const applyFiltersIfNeeded = (
    countries: Countries,
    filters?: CountryFilters
  ): Countries => {
    if (!filter) return countries;
    return filters ? filter.applyFilters(countries, filters) : countries;
  };
  //helper function
  const fetchAndCacheCountries = async (
    type: SearchType,
    term: string,
    cacheKey: string
  ): Promise<Countries> => {
    try {
      const countries = await api.fetchCountries(type, term);
      cache.setCache(cacheKey, countries);
      return countries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  };

  //main function
  const getCountries = async (
    type: SearchType,
    term: string,
    filters?: CountryFilters
  ): Promise<Countries> => {
    if (!validateInput(type, term)) {
      throw new Error('Invalid search parameters provided');
    }

    const cacheKey = cache.getCacheKey(`${type}:${term}`);
    const cachedData = cache.getFromCache(cacheKey);

    if (cachedData) {
      return applyFiltersIfNeeded(cachedData, filters);
    }

    const countries = await fetchAndCacheCountries(type, term, cacheKey);
    return applyFiltersIfNeeded(countries, filters);
  };

  return { getCountries };
};
