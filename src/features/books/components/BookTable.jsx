import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Box } from "@mui/material";
import toast from "react-hot-toast";
import StatusChip from "../../../components/ui/StatusChip";
import { useBooks } from "../../../context/LibraryContext";

const columns = (onDelete) => [
  { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
  { field: "author", headerName: "Author", flex: 1, minWidth: 130 },
  { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => <StatusChip label={params.value} />,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 110,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <>
        <IconButton color="primary" size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          onClick={() => onDelete(params.row.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </>
    ),
  },
];

export default function BookTable({ rows }) {
  const { deleteBook } = useBooks();

  const handleDelete = (id) => {
    deleteBook(id);
    toast.success("Book removed");
  };

  return (
    <Box sx={{ height: 550, width: "100%", mt: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns(handleDelete)}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
