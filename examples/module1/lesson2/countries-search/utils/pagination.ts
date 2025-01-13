export interface PaginationParams {
  currentPage: number; // Aktualnie wyświetlana strona
  itemsPerPage: number; // Liczba elementów na stronę
  totalPages: number; // Całkowita liczba stron
}

export const getTotalPages = <T>(items: T[], itemsPerPage: number): number => {
  return Math.ceil(items.length / itemsPerPage);
};

export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};
