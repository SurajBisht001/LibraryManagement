import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchBar from "../ui/SearchBar";
import ThemeToggle from "../ui/ThemeToggle";
import UserMenu from "../ui/UserMenu";
import { useLibrary } from "../../context/LibraryContext";

export default function Navbar({ onMenuClick }) {
  const { settings } = useLibrary();
  return (

    <AppBar
      position="fixed"
      color="inherit"
      sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
     }}
    >
      <Toolbar
        sx={{
          gap: 2,
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 64, sm: 70 },
        }}
      >
        <IconButton
          onClick={onMenuClick}
          edge="start"
          sx={{
            display: { md: "none" },
            mr: 0.5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          noWrap
          sx={{ maxWidth: { xs: 140, sm: 220, md: 280 } }}
        >
          {settings.libraryName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            mr: 1,
          }}
        >
          <SearchBar />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <IconButton size="medium" sx={{ color: "text.secondary" }}>
            <NotificationsIcon />
          </IconButton>
          <ThemeToggle />
          <Box sx={{ ml: 0.5 }}>
            <UserMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

