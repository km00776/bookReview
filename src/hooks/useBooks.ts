import { useCallback, useState } from "react";
import { fetchBooks, fetchBooksByName } from "../services/bookService";
import { Book } from "../types/bookTypes";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getBookByName = useCallback(async (title: string) => {
    setLoading(true);

    try {
      const data = await fetchBooksByName(title);
      setBooks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { getBooks, books, loading, error, getBookByName };
};
