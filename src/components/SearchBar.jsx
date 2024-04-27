import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-3xl w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by title or description..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full max-w-3xl"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
