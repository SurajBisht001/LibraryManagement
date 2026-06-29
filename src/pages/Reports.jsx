import { Typography, Box } from "@mui/material";

export default function Reports() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Reports
      </Typography>

      <Typography color="text.secondary">
        View library reports and analytics.
      </Typography>
    </Box>
  );
}