import { useState } from 'react';

import type { PaginationParams } from '../utils/pagination';

const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 2,
  DEFAULT_PAGE: 1,
};

export function usePagination(totalItems: number) {
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
    itemsPerPage: PAGINATION_CONFIG.ITEMS_PER_PAGE,
    totalPages: 0,
  });

  const updatePagination = (totalItems: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
      totalPages: Math.ceil(totalItems / PAGINATION_CONFIG.ITEMS_PER_PAGE),
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return { pagination, updatePagination, handlePageChange };
}
