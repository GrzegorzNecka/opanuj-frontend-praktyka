import React from 'react';
import type { SortOrder } from '../api/types';

interface SortOptionsProps {
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const SortOptions = ({ sortOrder, setSortOrder }: SortOptionsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortOrder);
  };

  return (
    <div className="mb-4">
      <label className="text-sm font-medium">
        Sort By:
        <select
          value={sortOrder}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="population">Population</option>
        </select>
      </label>
    </div>
  );
};

export default SortOptions;
