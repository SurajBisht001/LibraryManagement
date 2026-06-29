import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
        <Navbar onMenuClick={handleDrawerToggle} />
            <Sidebar
            mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />

    <Box
        component="main"
            sx={{
                flexGrow: 1,
                    bgcolor: "#F4F7FE",
                minHeight: "100vh",
            p: 3,
        }}
      >
        {/* Space below fixed navbar */}
        <Toolbar />
            <Outlet />
        </Box>
    </Box>
  );
}