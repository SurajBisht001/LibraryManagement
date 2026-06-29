import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";

const drawerWidth = 260;

function DrawerContent() {
    return (
        <>
            <Toolbar>
                <Typography
                    variant="h5"
                        fontWeight="bold"
                        color="primary">
                    📚 LibraryMS
                </Typography>
            </Toolbar>

    <List>
        {navigation.map((item) => {
            const Icon = item.icon;

        return (
            <ListItemButton
                key={item.title}
                    component={NavLink}
                        to={item.path}
                            sx={{
                        mx: 1,
                    my: 0.5,
                borderRadius: 2,

                "&.active": {
                    bgcolor: "primary.main",
                    color: "white",
                },

                "&.active .MuiListItemIcon-root": {
                    color: "white",
                },
            }}
            >
                
    <ListItemIcon>
        <Icon />
            </ListItemIcon>
                <ListItemText primary={item.title} />
            </ListItemButton>
        );})}
    </List></>
);}

export default function Sidebar({
  mobileOpen,
  onClose,
}) {
    return (
        <Box
            component="nav"
                sx={{
                    width: {
                        md: drawerWidth,
                    },
                flexShrink: {
            md: 0,
        },
      }}>

    {/* Mobile Drawer */}
        <Drawer
            variant="temporary"
                open={mobileOpen}
                    onClose={onClose}
                        ModalProps={{
                        keepMounted: true,
                            }}
                                sx={{
                                    display: {
                                xs: "block",
                            md: "none",
                        },
                    "& .MuiDrawer-paper": {
                width: drawerWidth,
            },
        }}>
    <DrawerContent />
</Drawer>

      {/* Desktop Drawer */}

      <Drawer
         variant="permanent"
            open
                sx={{
                    display: {
                             xs: "none",
                                md: "block",
                            },
                        "& .MuiDrawer-paper": {
                    width: drawerWidth,
                boxSizing: "border-box",
            },}}>
        <DrawerContent />
      </Drawer>
    </Box>
  );
}