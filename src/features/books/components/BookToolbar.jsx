import {
  Box,
  Button,
  TextField,
} from "@mui/material";

export default function BookToolbar({ onAdd }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      gap={2}
      flexWrap="wrap"
    >
      <TextField
        label="Search Books"
        size="small"
        sx={{ width: 300 }}
      />

      <Button
        variant="contained"
        onClick={onAdd}
      >
        Add Book
      </Button>
    </Box>
  );
}