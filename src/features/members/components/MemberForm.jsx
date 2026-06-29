import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  membershipType: "Student",
  status: "Active",
};

export default function MemberForm({ open, onClose, onSave, member }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        email: member.email,
        phone: member.phone,
        membershipType: member.membershipType,
        status: member.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [member, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    onSave(member ? { ...member, ...form } : form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{member ? "Edit Member" : "Add New Member"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="membershipType"
            label="Membership Type"
            select
            value={form.membershipType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Faculty">Faculty</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
          </TextField>

          {member && (
            <TextField
              name="status"
              label="Status"
              select
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {member ? "Save Changes" : "Add Member"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
