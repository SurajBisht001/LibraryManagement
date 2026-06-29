import { Typography, Box } from "@mui/material";

export default function ReturnBook() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Return Book
      </Typography>

      <Typography color="text.secondary">
        Manage returned books here.
      </Typography>
    </Box>
  );
}