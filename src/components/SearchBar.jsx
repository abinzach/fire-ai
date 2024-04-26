import React from "react";

// SearchBar component for filtering tasks by title or description
const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by title or description..."
      className="p-2 border border-gray-300 rounded-lg w-full max-w-3xl"
    />
  );
};

export default SearchBar;
