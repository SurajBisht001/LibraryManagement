import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
       <Sidebar />
         <Box
           component="main"
              sx={{
                flexGrow: 1,
                       p: 3,
                  bgcolor: "#F5F7FB",
               minHeight: "100vh",
               }}
            >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}