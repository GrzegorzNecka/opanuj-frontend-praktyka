export interface PaginationParams {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};
