import { useState } from "react";
import { Fade, Box } from "@mui/material";
import BookToolbar from "../features/books/components/BookToolbar";
import BookTable from "../features/books/components/BookTable";
import BookForm from "../features/books/components/BookForm";
import PageHeader from "../components/ui/PageHeader";
import { useBooks } from "../context/LibraryContext";

export default function Books() {
  const { books } = useBooks();
  const [open, setOpen] = useState(false);

  return (
    <Fade in timeout={400}>
      <Box>
        <PageHeader
          title="Books"
          subtitle="Manage your library book catalog"
        />

        <BookForm open={open} onClose={() => setOpen(false)} />

        <BookToolbar onAdd={() => setOpen(true)} />
        <BookTable rows={books} />
      </Box>
    </Fade>
  );
}
