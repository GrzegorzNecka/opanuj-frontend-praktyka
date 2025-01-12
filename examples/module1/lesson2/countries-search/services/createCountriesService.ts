import type { Countries, CountryFilters, SearchType } from './types';
import type { createCacheService } from './cacheService';
import type { createCountriesAPI } from './countriesAPI';
import type { createFilterService } from './filterService';

type Dependencies = {
  api: ReturnType<typeof createCountriesAPI>;
  cache: ReturnType<typeof createCacheService>;
  filter?: ReturnType<typeof createFilterService>;
};

const validateInput = (type: SearchType, term: string): boolean =>
  Boolean(type && term && typeof type === 'string' && typeof term === 'string');

export const createCountriesService = (dependencies: Dependencies) => {
  const { api, cache, filter } = dependencies;

  const getCountries = async (
    type: SearchType,
    term: string,
    filters?: CountryFilters
  ): Promise<Countries> => {
    if (!validateInput(type, term)) {
      throw new Error('Invalid search parameters provided');
    }

    const cacheKey = cache.getCacheKey(`${type}:${term}`);
    let countries: Countries;

    if (cache.hasCache(cacheKey)) {
      countries = cache.getFromCache(cacheKey)!;
    } else {
      try {
        countries = await api.fetchCountries(type, term);
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
