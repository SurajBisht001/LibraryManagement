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

export default function Navbar({
  onMenuClick,
}) {
    return (
        <AppBar
            position="fixed"
                color="inherit"
                    elevation={1}
                    sx={{
                zIndex: (theme) =>
            theme.zIndex.drawer + 1,
        }}
    >
        <Toolbar>
            <IconButton
                onClick={onMenuClick}
                    sx={{
                        display: {
                            md: "none",
                        },
                     mr: 2,
                }}
            >
        <MenuIcon />
        </IconButton>

        <Typography
            variant="h6"
                fontWeight="bold">
            Library Management
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
            <SearchBar />
                <Box sx={{ flexGrow: 1 }} />
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                <ThemeToggle />
            <UserMenu />
        </Toolbar>
    </AppBar>
  );
}