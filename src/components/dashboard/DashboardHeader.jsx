import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";

export default function DashboardHeader() {
  const today = dayjs().format("dddd, DD MMMM YYYY");

  return (
    <Box
      mb={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Welcome back, Admin 👋
        </Typography>
      </Box>

      <Typography color="text.secondary">
        {today}
      </Typography>
    </Box>
  );
}