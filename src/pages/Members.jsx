import { Box, Typography } from "@mui/material";

export default function Members() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Members
      </Typography>

      <Typography color="text.secondary">
        Manage library members here.
      </Typography>
    </Box>
  );
}