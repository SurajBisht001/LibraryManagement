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
                            py: 0.5,
                        width: 350,
                    border: "1px solid #ddd",
                borderRadius: 3,
            }}>

        <InputBase
            placeholder="Search books, members..."
                sx={{ flex: 1 }}/>
                    <IconButton>
                <SearchIcon />
            </IconButton>
        </Paper>
    );}