import type { Countries, CountryFilters } from './types';

type FilterFunction = (countries: Countries, value?: string) => Countries;

export const createFilterService = () => {
  const filterByRegion: FilterFunction = (countries, region) => {
    if (!region) return countries;
    return countries.filter(
      (country) => country.region.toLowerCase() === region.toLowerCase()
    );
  };

  const filterByLanguage: FilterFunction = (countries, language) => {
    if (!language) return countries;
    return countries.filter((country) =>
      Object.values(country.languages || {}).some((lang) =>
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );
  };

  const filterByCurrency: FilterFunction = (countries, currency) => {
    if (!currency) return countries;
    return countries.filter((country) =>
      Object.values(country.currencies || {}).some((details) =>
        (details as { name: string }).name
          .toLowerCase()
          .includes(currency.toLowerCase())
      )
    );
  };

  const filterByCapital: FilterFunction = (countries, capital) => {
    if (!capital) return countries;
    return countries.filter((country) =>
      country.capital?.[0].toLowerCase().includes(capital.toLowerCase())
    );
  };

  const applyFilters = (
    countries: Countries,
    filters: CountryFilters
  ): Countries => {
    let filtered = [...countries];
    const { region, language, currency, capital } = filters;

    filtered = filterByRegion(filtered, region);
    filtered = filterByLanguage(filtered, language);
    filtered = filterByCurrency(filtered, currency);
    filtered = filterByCapital(filtered, capital);

    return filtered;
  };

  return {
    applyFilters,
  };
};
