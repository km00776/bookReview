import { Book } from "../types/bookTypes";

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch("/api/books");

    if (response.ok) {
      const data: Book[] = await response.json();
      return data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    throw new Error(
      `Failed to fetch books: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const fetchBooksByName = async (title: string): Promise<Book[]> => {
  try {
    const response = await fetch(
      `/api/books?title=${encodeURIComponent(title)}`
    );

    if (response.ok) {
      const book: Book[] = await response.json();
      return book;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    throw new Error(
      `Failed to fetch books: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
