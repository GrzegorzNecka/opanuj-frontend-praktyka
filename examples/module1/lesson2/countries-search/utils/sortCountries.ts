import type { Country } from '../types';

export const sortCountries = (countries: Country[], sortOption: string) => {
  return [...countries].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.common.localeCompare(b.name.common);
      case 'population':
        return a.population - b.population;
      case 'area':
        return a.area - b.area;
      case 'region':
        return a.region.localeCompare(b.region);
      case 'currency':
        const currencyA = Object.values(a.currencies || {})
          .map((currency: { name: string; symbol: string }) => currency.name)
          .join(', ');
        const currencyB = Object.values(b.currencies || {})
          .map((currency: { name: string; symbol: string }) => currency.name)
          .join(', ');
        return currencyA.localeCompare(currencyB);
      default:
        return 0;
    }
  });
};
