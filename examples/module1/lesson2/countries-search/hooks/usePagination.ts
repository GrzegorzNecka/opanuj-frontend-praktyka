import { useState, useMemo, useEffect } from 'react';
import { getPaginatedItems, getTotalPages } from '../utils/pagination';

export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset strony do pierwszej, gdy zmienia się lista elementów
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const totalPages = getTotalPages(items, itemsPerPage);

  const paginatedItems = useMemo(() => {
    return getPaginatedItems(items, currentPage, itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    paginatedItems,
    pagination: {
      currentPage,
      totalPages,
      itemsPerPage,
    },
    handlePageChange,
  };
}
