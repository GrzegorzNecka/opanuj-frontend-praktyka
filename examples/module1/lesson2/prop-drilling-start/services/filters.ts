import type {
  Country,
  Countries,
  FilterCountriesOptions,
} from '../../countries-search/services/types';

const createFilter =
  (predicate: (country: Country, value: any) => boolean) =>
  (countries: Countries, options: FilterCountriesOptions): Countries =>
    !options
      ? countries
      : countries.filter((country) => predicate(country, options));

export const filters = {
  capital: createFilter((country, options) =>
    country.capital?.[0]
      ?.toLowerCase()
      .includes(options.capital?.toLowerCase() ?? '')
  ),

  population: createFilter(
    (country, options) => country.population >= (options.population ?? 0)
  ),

  region: createFilter(
    (country, options) =>
      country.region.toLowerCase() === options.region?.toLowerCase()
  ),

  language: createFilter((country, options) =>
    Object.values(country.languages || {}).some((lang) =>
      lang.toLowerCase().includes(options.language?.toLowerCase() ?? '')
    )
  ),
};

const createCacheKey = (
  name: string,
  options?: FilterCountriesOptions
): string =>
  `countries_${name.toLowerCase().trim()}_${JSON.stringify(options)}`;

const applyFilters = (
  countries: Countries,
  options?: FilterCountriesOptions
): Countries =>
  !options
    ? countries
    : Object.entries(options)
        .filter(([_, value]) => value !== undefined)
        .reduce(
          (acc, [filterName, _]) =>
            filters[filterName as keyof FilterCountriesOptions](acc, options),
          countries
        );

export const createCountriesService = (api: CountriesAPI, cache: Cache) => {
  const fetchCountries = async (
    name: string,
    options?: FilterCountriesOptions
  ): Promise<Countries> => {
    if (!name?.trim()) {
      throw new Error('Invalid country name provided');
    }

    const cacheKey = createCacheKey(name, options);
    const cachedResult = cache.get(cacheKey);

    if (cachedResult) {
      return cachedResult;
    }

    try {
      const countries = await api.fetch(name);
      const filteredCountries = applyFilters(countries, options);

      cache.set(cacheKey, filteredCountries);
      return filteredCountries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      throw error;
    }
  };

  return { fetchCountries };
};
