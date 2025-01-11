import type { Country } from './types';

export type SortOption = 'name' | 'population';

export const sortCountries = (countries: Country[], sortOption: SortOption) => {
  return [...countries].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.common.localeCompare(b.name.common);
      case 'population':
        return a.population - b.population;

      default:
        return 0;
    }
  });
};
