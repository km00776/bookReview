import React, { useEffect } from "react";
import { useBooks } from "../../hooks/useBooks";
import styles from "./Home.module.css";
import { BookCard } from "./components/BookCard/BookCard";
import { Book } from "../../types/bookTypes";
import { useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";

export const Home = () => {
  const { books, getBooks, getBookByName, error, loading } = useBooks();
  const navigate = useNavigate();

  // Fetch the message from the Express API
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleBtnPress = (book: Book) => {
    navigate("/Details", { state: { book } });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Book Directory</h1>
        <SearchBar onSearch={getBookByName} />
      </header>
      <div className={styles.cardContainer}>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {books?.length > 0
          ? books.map((book, index) => {
              return (
                <BookCard
                  title={book.title}
                  ISBN={book.ISBN}
                  author={book.author}
                  rating={book.rating}
                  onPress={() => handleBtnPress(book)}
                  key={index}
                />
              );
            })
          : !loading && <p data-testid="no-books-found">No books found</p>}
      </div>
    </div>
  );
};

export default Home;
