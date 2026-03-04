import React, { useState } from 'react';

const SortingComponent = (props) => {
  const [selectedOption, setSelectedOption] = useState('');
  // Local state for sorted books
  const [sortedBooks, setSortedBooks] = useState([...props.books]);

  /*This function handles the sorting for the books, by default the list is in ranking
  order so we just changed it for alphabetically and reversed alphabetically*/
  const handleSort = (option) => {
    let sortedList = [...props.books];
    if (option === 'alphabetically') {
      sortedList.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
    } else if (option === 'reverseAlphabetically') {
      sortedList.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1);
    }
    setSelectedOption(option);
    // Update local state
    setSortedBooks(sortedList);
  };

  /*Here we display a list of options for the user to choose how to view the books in and
  then we map through the list to display them*/
  return (
    <div>
      <select onChange={(e) => handleSort(e.target.value)} value={selectedOption}>
        <option value="">Top Rated</option>
        <option value="alphabetically">Alphabetically</option>
        <option value="reverseAlphabetically">Reverse Alphabetically</option>
      </select>
      <ul>
        {sortedBooks && sortedBooks.map(item => (
            <li key={item.id}>{item.title}</li>
        ))}
	  </ul>
    </div>
  );
};

export default SortingComponent;


