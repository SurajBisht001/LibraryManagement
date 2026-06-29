import { useState, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Fade,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import toast from "react-hot-toast";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import MemberTable from "../features/members/components/MemberTable";
import MemberForm from "../features/members/components/MemberForm";
import { useLibrary } from "../context/LibraryContext";

export default function Members() {
  const { members, addMember, updateMember, deleteMember } = useLibrary();
  const [open, setOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.phone.includes(query)
    );
  }, [members, search]);

  const activeCount = members.filter((m) => m.status === "Active").length;
  const inactiveCount = members.length - activeCount;

  const handleSave = (data) => {
    if (editingMember) {
      updateMember(data);
      toast.success("Member updated successfully");
    } else {
      addMember(data);
      toast.success("Member added successfully");
    }
    setEditingMember(null);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteMember(id);
    toast.success("Member removed");
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMember(null);
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <PageHeader
          title="Members"
          subtitle="Manage library members and memberships"
          action={
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => setOpen(true)}
            >
              Add Member
            </Button>
          }
        />

        <Grid container spacing={4} mb={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Total Members"
              value={members.length}
              icon={<PeopleIcon />}
              colorKey="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Active"
              value={activeCount}
              icon={<HowToRegIcon />}
              colorKey="success"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              title="Inactive"
              value={inactiveCount}
              icon={<PersonOffIcon />}
              colorKey="error"
            />
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              flexWrap="wrap"
              gap={3}
            >
              <Typography variant="h6" color="text.primary">
                Member Directory
              </Typography>
              <TextField
                size="small"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: "100%", sm: 280 } }}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
            <MemberTable
              rows={filteredMembers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            </Box>
          </CardContent>
        </Card>

        <MemberForm
          open={open}
          onClose={handleClose}
          onSave={handleSave}
          member={editingMember}
        />
      </Box>
    </Fade>
  );
}
