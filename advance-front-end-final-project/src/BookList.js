// BookList.js

import React from 'react';

const BookList = ({ books }) => {
  /*This components maps through the list of books obtained from our api and displays the book tile, 
  author name and purchase links for each books*/
  return (
    <div id='booklist'>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.title}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Purchase From: {book.buy_links && book.buy_links.length > 0 ? (
              book.buy_links.map((link, index) => (
                <a key={index} href={link.url}>{link.name} &nbsp; &nbsp;</a>
              ))
            ) : (
              "Purchase links not available"
            )}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
