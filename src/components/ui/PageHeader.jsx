import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Box
      mb={5}
      display="flex"
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      flexDirection={{ xs: "column", sm: "row" }}
      gap={3}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" mt={1.5} lineHeight={1.6}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  );
}
