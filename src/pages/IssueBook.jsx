import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import StatusChip from "../components/ui/StatusChip";
import { useLibrary } from "../context/LibraryContext";

export default function IssueBook() {
  const { books, members, settings, stats, issueBook, transactions, getBookById, getMemberById } =
    useLibrary();

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dueDate, setDueDate] = useState(
    dayjs().add(settings.maxBorrowDays, "day").format("YYYY-MM-DD")
  );

  const availableBooks = books.filter((b) => b.status === "Available");
  const activeMembers = members.filter((m) => m.status === "Active");

  const recentIssues = [...transactions]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const handleIssue = () => {
    if (!selectedBook || !selectedMember) {
      toast.error("Please select both a book and a member");
      return;
    }

    const result = issueBook(selectedBook.id, selectedMember.id, dueDate);
    if (result.success) {
      toast.success(result.message);
      setSelectedBook(null);
      setSelectedMember(null);
      setDueDate(dayjs().add(settings.maxBorrowDays, "day").format("YYYY-MM-DD"));
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <PageHeader
          title="Issue Book"
          subtitle="Lend books to library members"
        />

        <Grid container spacing={4} mb={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Available Books"
              value={stats.availableBooks}
              icon={<MenuBookIcon />}
              colorKey="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Active Members"
              value={stats.activeMembers}
              icon={<PeopleIcon />}
              colorKey="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Currently Issued"
              value={stats.issuedBooks}
              icon={<AssignmentTurnedInIcon />}
              colorKey="warning"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Issue Details
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                  Select a member and an available book to create a new issue record.
                </Typography>

                <Stack spacing={3.5}>
                  <Autocomplete
                    options={activeMembers}
                    getOptionLabel={(option) => option.name}
                    value={selectedMember}
                    onChange={(_, value) => setSelectedMember(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Member" />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" {...props} key={option.id}>
                        <Box>
                          <Typography variant="body2">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.email} · {option.membershipType}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    noOptionsText="No active members"
                  />

                  <Autocomplete
                    options={availableBooks}
                    getOptionLabel={(option) => option.title}
                    value={selectedBook}
                    onChange={(_, value) => setSelectedBook(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Book" />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" {...props} key={option.id}>
                        <Box>
                          <Typography variant="body2">{option.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.author} · {option.category}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    noOptionsText="No books available"
                  />

                  <TextField
                    label="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                    fullWidth
                    helperText={`Default borrow period: ${settings.maxBorrowDays} days`}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AssignmentTurnedInIcon />}
                    onClick={handleIssue}
                    disabled={!selectedBook || !selectedMember}
                  >
                    Issue Book
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Recent Issues
                </Typography>
                <Divider sx={{ my: 2 }} />

                {recentIssues.length === 0 ? (
                  <Typography color="text.secondary" variant="body2">
                    No issues recorded yet.
                  </Typography>
                ) : (
                  <List disablePadding>
                    {recentIssues.map((t, index) => {
                      const book = getBookById(t.bookId);
                      const member = getMemberById(t.memberId);
                      return (
                        <Box key={t.id}>
                          <ListItem disablePadding sx={{ py: 2, gap: 2 }}>
                            <ListItemText
                              primary={book?.title || "Unknown Book"}
                              secondary={`${member?.name} · Due ${dayjs(t.dueDate).format("DD MMM YYYY")}`}
                              primaryTypographyProps={{ fontWeight: 500, mb: 0.5 }}
                              secondaryTypographyProps={{ mt: 0.5 }}
                            />
                            <StatusChip
                              label={t.status === "Active" ? "Issued" : "Returned"}
                            />
                          </ListItem>
                          {index < recentIssues.length - 1 && <Divider />}
                        </Box>
                      );
                    })}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
