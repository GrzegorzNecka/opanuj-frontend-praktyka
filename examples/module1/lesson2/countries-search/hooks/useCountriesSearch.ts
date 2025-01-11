import { useState, useEffect } from 'react';
import type { Countries } from '../services/types';
import { fetchCountries } from '../services';
import { sortCountries, type SortOption } from '../services/sortCountries';
import type { CountryFilters } from '../services/types';
import { getPaginatedItems } from '../utils/pagination';
import { usePagination } from './usePagination';

export function useCountriesSearch(
  searchTerm: string,
  sortOption: SortOption,
  countryFilters: CountryFilters
) {
  const [countries, setCountries] = useState<Countries>([]);
  const { pagination, updatePagination, handlePageChange } = usePagination(
    countries.length
  );

  useEffect(() => {
    const fetchCountriesData = async () => {
      if (!searchTerm) {
        setCountries([]);
        updatePagination(0);
        return;
      }

      try {
        const data = await fetchCountries(searchTerm, countryFilters);
        setCountries(data);
        updatePagination(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCountries([]);
        updatePagination(0);
      }
    };

    fetchCountriesData();
  }, [searchTerm, ...Object.values(countryFilters)]);

  const sortedCountries = sortCountries(countries, sortOption);
  const paginatedCountries = getPaginatedItems(
    sortedCountries,
    pagination.currentPage,
    pagination.itemsPerPage
  );

  return {
    countries: paginatedCountries,
    pagination,
    handlePageChange,
  };
}
