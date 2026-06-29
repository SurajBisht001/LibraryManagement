import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 0.75,
        width: { md: 280, lg: 320 },
        maxWidth: "100%",
        bgcolor: "background.default",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <InputBase
        placeholder="Search books, members..."
        sx={{ flex: 1, color: "text.primary", mr: 1 }}
      />
      <IconButton size="small" sx={{ color: "text.secondary" }}>
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}
