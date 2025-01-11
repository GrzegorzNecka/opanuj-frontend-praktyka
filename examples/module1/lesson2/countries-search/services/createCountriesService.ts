import type { Countries, CountryFilters } from './types';
import type { createCacheService } from './cacheService';
import type { createCountriesAPI } from './countriesAPI';
import type { createFilterService } from './filterService';

type Dependencies = {
  api: ReturnType<typeof createCountriesAPI>;
  cache: ReturnType<typeof createCacheService>;
  filter?: ReturnType<typeof createFilterService>;
};

const validateInput = (name: string): boolean =>
  Boolean(name && typeof name === 'string');

export const createCountriesService = (dependencies: Dependencies) => {
  const { api, cache, filter } = dependencies;

  const getCountries = async (
    name: string,
    filters?: CountryFilters
  ): Promise<Countries> => {
    if (!validateInput(name)) {
      throw new Error('Invalid country name provided');
    }

    const cacheKey = cache.getCacheKey(name);
    let countries: Countries;

    if (cache.hasCache(cacheKey)) {
      countries = cache.getFromCache(cacheKey)!;
    } else {
      try {
        countries = await api.fetchCountries(name);
        if (!Array.isArray(countries)) {
          return [];
        }
        cache.setCache(cacheKey, countries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        throw error;
      }
    }

    if (!filter) return countries;

    return filters ? filter.applyFilters(countries, filters) : countries;
  };

  return { getCountries };
};
