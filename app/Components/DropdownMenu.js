import React, { useState } from 'react';

const DropdownMenu = ({ onSort }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    onSort(newSortOrder);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleSortChange}
          className="flex items-center bg-white rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition"
        >
          Sort by Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
