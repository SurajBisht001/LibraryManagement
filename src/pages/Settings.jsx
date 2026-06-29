import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Slider,
  Divider,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import toast from "react-hot-toast";
import PageHeader from "../components/ui/PageHeader";
import { useLibrary } from "../context/LibraryContext";
import { useColorMode } from "../context/ThemeContext";

function SettingsSection({ title, description, children }) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h6" gutterBottom color="text.primary">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" mb={3}>
            {description}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export default function Settings() {
  const { settings, updateSettings, resetLibraryData } = useLibrary();
  const { mode, toggleColorMode } = useColorMode();
  const [resetOpen, setResetOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLocalSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (_, value) => {
    setLocalSettings((prev) => ({ ...prev, maxBorrowDays: value }));
  };

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    resetLibraryData();
    setLocalSettings(settings);
    setResetOpen(false);
    toast.success("Library data reset to defaults");
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <PageHeader
          title="Settings"
          subtitle="Configure your library preferences"
          action={
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          }
        />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <SettingsSection
              title="Library Information"
              description="Basic details about your library."
            >
              <TextField
                label="Library Name"
                value={localSettings.libraryName}
                onChange={handleChange("libraryName")}
                fullWidth
                sx={{ mb: 2,mt: 3}}
              />
            </SettingsSection>

            <SettingsSection
              title="Borrowing Rules"
              description="Set default borrowing policies for all members."
            >
              <Typography gutterBottom color="text.secondary" variant="body2">
                Maximum borrow period: {localSettings.maxBorrowDays} days
              </Typography>
              <Slider
                value={localSettings.maxBorrowDays}
                onChange={handleSliderChange}
                min={7}
                max={30}
                step={1}
                marks={[
                  { value: 7, label: "7d" },
                  { value: 14, label: "14d" },
                  { value: 21, label: "21d" },
                  { value: 30, label: "30d" },
                ]}
                sx={{ mb: 3, mt: 1 }}
              />

              <TextField
                label="Fine per overdue day (₹)"
                type="number"
                value={localSettings.finePerDay}
                onChange={handleChange("finePerDay")}
                fullWidth
                inputProps={{ min: 0, max: 100 }}
              />
            </SettingsSection>

            <SettingsSection
              title="Notifications"
              description="Manage email and alert preferences."
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={localSettings.emailNotifications}
                    onChange={handleChange("emailNotifications")}
                    color="primary"
                  />
                }
                label="Email notifications for overdue books"
              />
            </SettingsSection>

            <SettingsSection
              title="Danger Zone"
              description="Irreversible actions — proceed with caution."
            >
              <Alert severity="warning" sx={{ mb: 2 }}>
                Resetting will restore all books, members, and transactions to
                default sample data.
              </Alert>
              <Button
                variant="outlined"
                color="error"
                startIcon={<RestartAltIcon />}
                onClick={() => setResetOpen(true)}
              >
                Reset Library Data
              </Button>
            </SettingsSection>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <SettingsIcon color="primary" />
                  <Typography variant="h6" color="text.primary">
                    Appearance
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                  border={1}
                  borderColor="divider"
                  borderRadius={2}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    {mode === "light" ? (
                      <LightModeIcon color="warning" />
                    ) : (
                      <DarkModeIcon color="primary" />
                    )}
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {mode === "light" ? "Light Mode" : "Dark Mode"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Toggle application theme
                      </Typography>
                    </Box>
                  </Box>
                  <Switch
                    checked={mode === "dark"}
                    onChange={toggleColorMode}
                    color="primary"
                  />
                </Box>

                <Box mt={3} p={2} bgcolor="background.default" borderRadius={2}>
                  <Typography variant="caption" color="text.secondary">
                    Current Configuration
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Borrow period: {localSettings.maxBorrowDays} days
                  </Typography>
                  <Typography variant="body2">
                    Fine rate: ₹{localSettings.finePerDay}/day
                  </Typography>
                  <Typography variant="body2">
                    Notifications:{" "}
                    {localSettings.emailNotifications ? "On" : "Off"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={resetOpen} onClose={() => setResetOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Reset Library Data?</DialogTitle>
          <DialogContent>
            <Typography>
              This will permanently delete all your changes and restore sample
              data. This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setResetOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleReset}>
              Reset Everything
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}
