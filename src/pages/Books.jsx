import { useState } from "react";
import Typography from "@mui/material/Typography";
import BookToolbar from "../features/books/components/BookToolbar";
import BookTable from "../features/books/components/BookTable";
import BookForm from "../features/books/components/BookForm";
import { useBooks } from "../context/BooksContext";

export default function Books() {
     const { books } = useBooks();
     const [open, setOpen] = useState(false);
  return (
    <>
<BookForm
    open={open}
    onClose={() => setOpen(false)}
/>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Books
      </Typography>

      <BookToolbar
    onAdd={() => setOpen(true)}
/>
<BookTable rows={books} />
    </>
  );
}