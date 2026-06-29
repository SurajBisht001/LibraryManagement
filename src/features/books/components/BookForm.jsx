import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { useBooks } from "../../../context/LibraryContext";

const emptyForm = {
  title: "",
  author: "",
  isbn: "",
  category: "",
};

export default function BookForm({ open, onClose }) {
  const { addBook } = useBooks();
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.author.trim()) {
      toast.error("Title and author are required");
      return;
    }
    addBook(form);
    toast.success("Book added successfully");
    setForm(emptyForm);
    onClose();
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Book</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="author"
            label="Author"
            value={form.author}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="isbn"
            label="ISBN"
            value={form.isbn}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}
