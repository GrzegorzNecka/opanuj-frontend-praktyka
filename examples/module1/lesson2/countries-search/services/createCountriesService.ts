import type { Countries } from './types';
import type { createCacheService } from './cacheService';
import type { createCountriesAPI } from './countriesAPI';

type Dependencies = {
  api: ReturnType<typeof createCountriesAPI>;
  cache: ReturnType<typeof createCacheService>;
};

const validateInput = (name: string): boolean =>
  Boolean(name && typeof name === 'string');

export const createCountriesService = ({ api, cache }: Dependencies) => {
  
  const getCountries = async (name: string): Promise<Countries> => {
    if (!validateInput(name)) {
      throw new Error('Invalid country name provided');
    }

    const cacheKey = cache.getCacheKey(name);

    if (cache.hasCache(cacheKey)) {
      return cache.getFromCache(cacheKey)!;
    }

    try {
      const result = await api.fetchCountries(name);
      if (!Array.isArray(result)) return [];

      cache.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  };

  return { getCountries };
};
