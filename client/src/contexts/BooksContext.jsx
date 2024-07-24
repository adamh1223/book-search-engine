import React, { createContext, useState, useContext } from 'react';

const BooksContext = createContext();

export function useBooks() {
  return useContext(BooksContext);
}

export function BooksProvider({ children }) {
  const [savedBooks, setSavedBooks] = useState([]);

  const saveBook = (book) => {
    setSavedBooks((prevBooks) => {
      if (prevBooks.find((b) => b.id === book.id)) {
        return prevBooks; // Book already saved
      }
      return [...prevBooks, book];
    });
  };

  const isBookSaved = (bookId) => {
    return savedBooks.some((book) => book.id === bookId);
  };

  return (
    <BooksContext.Provider value={{ savedBooks, saveBook, isBookSaved }}>
      {children}
    </BooksContext.Provider>
  );
}
