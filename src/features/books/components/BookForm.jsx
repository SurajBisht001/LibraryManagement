import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Button,
} from "@mui/material";

import { useState } from "react";

export default function BookForm({ open, onClose }) {

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Book</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={2}>

          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
          />

          <TextField
            name="author"
            label="Author"
            value={form.author}
            onChange={handleChange}
          />

          <TextField
            name="isbn"
            label="ISBN"
            value={form.isbn}
            onChange={handleChange}
          />

          <TextField
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
          />

          <Button variant="contained">
            Save Book
          </Button>

        </Stack>
      </DialogContent>
    </Dialog>
  );
}