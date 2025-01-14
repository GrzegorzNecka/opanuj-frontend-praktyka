import { CountriesList } from '../components/CountriesList';
import { Pagination } from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';
import type { Countries } from '../services/types';

interface CountriesListContainerProps {
  countries: Countries;
  isLoading: boolean;
  error: Error | null;
}

export function CountriesListContainer({
  countries,
  isLoading,
  error,
}: CountriesListContainerProps) {
  const {
    paginatedItems: paginatedCountries,
    pagination,
    handlePageChange,
  } = usePagination(countries);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
    // return <div>Failed to fetch countries</div>;
  }

  if (paginatedCountries.length === 0) {
    return <div>No countries found</div>;
  }

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
