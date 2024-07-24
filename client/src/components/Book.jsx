import React from 'react';
import { useBooks } from '../contexts/BooksContext';

function Book({ book }) {
  const { saveBook, isBookSaved } = useBooks();
  const [message, setMessage] = React.useState('');

  const handleSave = () => {
    if (isBookSaved(book.id)) {
      setMessage('Book already saved!');
    } else {
      saveBook(book);
      setMessage('Book saved!');
    }
  };

  return (
    <div className="book">
      <h3>{book.title}</h3>
      <button onClick={handleSave} disabled={isBookSaved(book.id)}>
        {isBookSaved(book.id) ? 'Book already saved!' : 'Save this book'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Book;
