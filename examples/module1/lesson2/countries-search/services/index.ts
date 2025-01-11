import { createCacheService } from './cacheService';
import { createCountriesAPI } from './countriesAPI';
import { createCountriesService } from './createCountriesService';

const api = createCountriesAPI();
const cache = createCacheService();
const countriesService = createCountriesService({ api, cache });

export const fetchCountries = countriesService.getCountries;
