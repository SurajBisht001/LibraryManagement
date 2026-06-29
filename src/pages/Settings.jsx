import { Typography, Box } from "@mui/material";

export default function Settings() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Settings
      </Typography>

      <Typography color="text.secondary">
        Manage application settings.
      </Typography>
    </Box>
  );
}