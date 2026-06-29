import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({
  title,
  value,
  icon,
  colorKey = "primary",
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, "&:last-child": { pb: { xs: 2.5, sm: 3 } } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography color="text.secondary" variant="body2" gutterBottom sx={{ mb: 1 }}>
              {title}
            </Typography>

            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: `${colorKey}.main`,
              color: `${colorKey}.contrastText`,
              p: 1.75,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
