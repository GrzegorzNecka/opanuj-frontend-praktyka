import { createCacheService } from './cacheService';
import { createCountriesAPI } from './countriesAPI';
import { createCountriesService } from './createCountriesService';
import { createFilterService } from './filterService';

const api = createCountriesAPI();
const cache = createCacheService();
const filter = createFilterService();
const { getCountries } = createCountriesService({ api, cache, filter });

export const fetchCountries = getCountries;
