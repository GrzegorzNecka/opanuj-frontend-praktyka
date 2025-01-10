import type { Countries } from './types';

const fetchCountries = async (name: string): Promise<Countries> => {
  const URL = 'https://restcountries.com/v3.1';
  const response = await fetch(`${URL}/name/${name}`);
  return response.json();
};

// Podstawowy serwis umożliwijący rozszerzenia
const baseCountriesService = {
  async fetchCountries(name: string): Promise<Countries> {
    return fetchCountries(name);
  },
};

// Handler dla Proxy z mechanizmem cachowania
type ProxyHandler = {
  cache: Map<string, Countries>;
  get(
    target: typeof baseCountriesService,
    prop: string,
    receiver: unknown
  ): Promise<Countries>;
};

const proxyHandler: ProxyHandler = {
  cache: new Map(),

  get(target, prop, receiver) {
    if (prop !== 'fetchCountries') {
      return Reflect.get(target, prop, receiver);
    }

    return async (name: string): Promise<Countries> => {
      if (!name || typeof name !== 'string') {
        throw new Error('Invalid country name provided');
      }

      const cacheKey = `countries_${name.toLowerCase().trim()}`;

      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      try {
        const result = await target.fetchCountries(name);
        if (!Array.isArray(result)) return [];
        this.cache.set(cacheKey, result);
        return result;
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        throw error;
      }
    };
  },
};

export const countriesService = new Proxy(baseCountriesService, proxyHandler);
