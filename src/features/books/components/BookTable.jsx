import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const columns = [
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "author",
    headerName: "Author",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <>
        <IconButton
          color="primary"
          onClick={() => console.log("Edit", params.row)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => console.log("Delete", params.row)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

export default function BookTable({ rows }) {
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}