import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import StatusChip from "../components/ui/StatusChip";
import { useLibrary } from "../context/LibraryContext";

export default function ReturnBook() {
  const { activeTransactions, stats, settings, returnBook } = useLibrary();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const getFinePreview = (transaction) => {
    const daysOverdue = dayjs().diff(dayjs(transaction.dueDate), "day");
    return daysOverdue > 0 ? daysOverdue * settings.finePerDay : 0;
  };

  const handleReturnClick = (transaction) => {
    setSelectedTransaction(transaction);
    setConfirmOpen(true);
  };

  const handleConfirmReturn = () => {
    if (!selectedTransaction) return;
    const result = returnBook(selectedTransaction.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setConfirmOpen(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      field: "bookTitle",
      headerName: "Book",
      flex: 1,
      minWidth: 160,
      valueGetter: (_, row) => row.book?.title || "—",
    },
    {
      field: "memberName",
      headerName: "Member",
      flex: 1,
      minWidth: 140,
      valueGetter: (_, row) => row.member?.name || "—",
    },
    {
      field: "issueDate",
      headerName: "Issued",
      width: 120,
      valueFormatter: (value) => dayjs(value).format("DD MMM YY"),
    },
    {
      field: "dueDate",
      headerName: "Due",
      width: 120,
      valueFormatter: (value) => dayjs(value).format("DD MMM YY"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <StatusChip
          label={params.row.isOverdue ? "Overdue" : "Issued"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          color={params.row.isOverdue ? "error" : "primary"}
          startIcon={<KeyboardReturnIcon />}
          onClick={() => handleReturnClick(params.row)}
        >
          Return
        </Button>
      ),
    },
  ];

  const finePreview = selectedTransaction
    ? getFinePreview(selectedTransaction)
    : 0;

  return (
    <Fade in timeout={400}>
      <Box>
        <PageHeader
          title="Return Book"
          subtitle="Process book returns and manage overdue items"
        />

        <Grid container spacing={4} mb={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Active Issues"
              value={stats.activeIssues}
              icon={<PendingActionsIcon />}
              colorKey="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Overdue"
              value={stats.overdueCount}
              icon={<WarningAmberIcon />}
              colorKey="error"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="On Time"
              value={stats.activeIssues - stats.overdueCount}
              icon={<CheckCircleIcon />}
              colorKey="success"
            />
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.primary">
              Books Awaiting Return
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              {activeTransactions.length === 0
                ? "All books have been returned. Great job!"
                : `${activeTransactions.length} book(s) currently issued to members.`}
            </Typography>

            <Box sx={{ height: 480, width: "100%", mt: 1 }}>
              <DataGrid
                rows={activeTransactions}
                columns={columns}
                pageSizeOptions={[5, 10]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Confirm Return</DialogTitle>
          <DialogContent>
            {selectedTransaction && (
              <Box>
                <Typography mb={2}>
                  Return <strong>{selectedTransaction.book?.title}</strong> from{" "}
                  <strong>{selectedTransaction.member?.name}</strong>?
                </Typography>

                {finePreview > 0 ? (
                  <Alert severity="warning">
                    This book is overdue. A fine of ₹{finePreview} will be applied
                    (₹{settings.finePerDay}/day).
                  </Alert>
                ) : (
                  <Alert severity="success">
                    Returned on time — no fine applicable.
                  </Alert>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setConfirmOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirmReturn}>
              Confirm Return
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}
