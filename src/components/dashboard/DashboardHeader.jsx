import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";

export default function DashboardHeader() {
  const today = dayjs().format("dddd, DD MMMM YYYY");

  return (
    <Box
      mb={5}
      display="flex"
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Dashboard
        </Typography>

        <Typography color="text.secondary" mt={1.5}>
          Welcome back, Admin 👋
        </Typography>
      </Box>

      <Typography color="text.secondary" sx={{ pt: { xs: 0, md: 0.5 } }}>
        {today}
      </Typography>
    </Box>
  );
}
