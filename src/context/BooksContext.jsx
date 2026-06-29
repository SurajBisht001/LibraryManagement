import { createContext, useContext, useEffect, useState } from "react";
import { dummyBooks } from "../features/books/data/dummyBooks";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : dummyBooks;
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...book,
        status: "Available",
      },
    ]);
  };

  const updateBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) =>
      prev.filter((book) => book.id !== id)
    );
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export const useBooks = () => useContext(BooksContext);