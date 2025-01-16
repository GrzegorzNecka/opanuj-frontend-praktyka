import { CountriesList } from '../components/CountriesList';
import { Pagination } from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';
import type { Countries } from '../services/types';

interface CountriesListContainerProps {
  countries: Countries;
}

export function CountriesListContainer({
  countries,
}: CountriesListContainerProps) {
  const {
    paginatedItems: paginatedCountries,
    pagination,
    handlePageChange,
  } = usePagination(countries);

  return (
    <>
      <CountriesList countries={paginatedCountries} />
      {paginatedCountries.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
