import { useState } from 'react';
import { SearchInput } from '../components/SearchInput';
import type { FilterType, SortOrder } from '../api/types';
import { CountriesList } from '../components/CountriesList';
import { Pagination } from '../components/Pagination';
import useFetchCountries from '../hooks/useFetchCountries';
import { usePagination } from '../hooks/usePagination';
import React from 'react';
import FilterOptions from '../components/FilterOptions';
import SortOptions from '../components/SortOptions';
import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';

function CountrySearchContainers() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('alphabetical');
  const [filterType, setFilterType] = useState<FilterType>('name');
  const { countries, isLoading, error } = useFetchCountries(
    searchTerm,
    filterType
  );

  const sortedCountries = React.useMemo(() => {
    if (!countries) return [];
    const sorted = [...countries];
    if (sortOrder === 'alphabetical') {
      sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOrder === 'population') {
      sorted.sort((a, b) => (b.population || 0) - (a.population || 0));
    }
    return sorted;
  }, [countries, sortOrder]);

  const {
    paginatedItems: paginatedCountries,
    pagination,
    handlePageChange,
  } = usePagination(sortedCountries, 5);

  const renderContent = () => {
    if (error) return <div className="text-red-500">{error}</div>;
    if (isLoading) return <Loader />;

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
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
        <SearchInput
          label={`Search by ${filterType}`}
          placeholder={`Search by country's ${filterType}...`}
          name={filterType}
          value={searchTerm}
          searchValue={setSearchTerm}
        />

        <FilterOptions filterType={filterType} setFilterType={setFilterType} />
        <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>

      <ErrorBoundary>{renderContent()}</ErrorBoundary>
    </>
  );
}

export default CountrySearchContainers;
