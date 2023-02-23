import React, { useState } from 'react';

const Typeahead = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState(['cat', 'dog', 'bird']);

  const handleInputChange = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const handleRecentSearchClick = (searchTerm:any) => {
    setSearchTerm(searchTerm);
  };

  const suggestions = recentSearches.filter((search) =>
    search.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search"
      />
      {searchTerm === '' && (
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => handleRecentSearchClick(search)}>
              {search}
            </li>
          ))}
        </ul>
      )}
      {searchTerm !== '' && suggestions.length > 0 && (
        <ul>
          {suggestions.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Typeahead;