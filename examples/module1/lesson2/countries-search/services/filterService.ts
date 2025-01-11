import type { Countries, CountryFilters } from './types';

export const createFilterService = () => {
  const filterByRegion = (countries: Countries, region?: string): Countries => {
    if (!region) return countries;
    return countries.filter(
      (country) => country.region.toLowerCase() === region.toLowerCase()
    );
  };

  const filterByPopulation = (
    countries: Countries,
    population?: number
  ): Countries => {
    if (!population) return countries;
    return countries.filter((country) => country.population <= population);
  };

  const filterByLanguage = (
    countries: Countries,
    language?: string
  ): Countries => {
    if (!language) return countries;
    return countries.filter((country) =>
      Object.values(country.languages || {}).some((lang) =>
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );
  };

  const filterByCurrency = (
    countries: Countries,
    currency?: string
  ): Countries => {
    if (!currency) return countries;
    return countries.filter((country) =>
      Object.values(country.currencies || {}).some((details) =>
        (details as { name: string }).name
          .toLowerCase()
          .includes(currency.toLowerCase())
      )
    );
  };

  const filterByCapital = (
    countries: Countries,
    capital?: string
  ): Countries => {
    if (!capital) return countries;
    return countries.filter((country) =>
      country.capital?.[0].toLowerCase().includes(capital.toLowerCase())
    );
  };

  const applyFilters = (
    countries: Countries,
    filters: CountryFilters
  ): Countries => {
    let filtered = countries;
    filtered = filterByRegion(filtered, filters.region);
    filtered = filterByPopulation(filtered, filters.population);
    filtered = filterByLanguage(filtered, filters.language);
    filtered = filterByCurrency(filtered, filters.currency);
    filtered = filterByCapital(filtered, filters.capital);
    return filtered;
  };

  return {
    applyFilters,
  };
};
