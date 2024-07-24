import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_BOOKS } from '../graphql/queries';
import { SAVE_BOOK } from '../graphql/mutations';

function Home() {
  const { data: userData } = useQuery(QUERY_USER);
  const { data: booksData } = useQuery(QUERY_BOOKS);
  const [saveBook] = useMutation(SAVE_BOOK);
  const [search, setSearch] = useState('');

  const handleSaveBook = async (book) => {
    try {
      await saveBook({ variables: { bookData: book } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a book"
      />
      <button onClick={() => searchBooks(search)}>Search</button>
      {booksData && (
        <div>
          {booksData.searchBooks.map((book) => (
            <div key={book.bookId}>
              <h2>{book.title}</h2>
              <button onClick={() => handleSaveBook(book)}>Save</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
