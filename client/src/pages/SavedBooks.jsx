import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useBooks } from '../contexts/BooksContext';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const { savedBooks, saveBook, isBookSaved } = useBooks();
  const [userData, setUserData] = useState({});

  // Dummy user data setup
  useEffect(() => {
    // Simulate fetching user data for now
    // Replace this with your actual fetch logic if needed
    const fetchUserData = async () => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (token) {
        // Simulate API call
        setUserData({ savedBooks: savedBooks }); 
      }
    };

    fetchUserData();
  }, [savedBooks]);

  // Create a function that handles removing books
  const handleDeleteBook = (bookId) => {
    setUserData((prevData) => ({
      savedBooks: prevData.savedBooks.filter((book) => book.id !== bookId),
    }));
    // Optionally, you can add more logic for deletion here
  };

  // If data isn't available yet, display loading
  if (!userData.savedBooks) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.id}>
              <Card border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.id)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
