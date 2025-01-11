import type { Countries } from './types';

export const createCacheService = () => {
  const cache = new Map<string, Countries>();

  const getCacheKey = (name: string): string =>
    `countries_${name.toLowerCase().trim()}`;

  const hasCache = (key: string): boolean => cache.has(key);

  const getFromCache = (key: string): Countries | undefined => cache.get(key);

  const setCache = (key: string, value: Countries): void => {
    cache.set(key, value);
  };

  return {
    getCacheKey,
    hasCache,
    getFromCache,
    setCache,
  };
};
