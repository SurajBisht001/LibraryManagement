import Grid from "@mui/material/Grid";
import { Fade, Box } from "@mui/material";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import BorrowChart from "../components/dashboard/BorrowChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useLibrary } from "../context/LibraryContext";

export default function Dashboard() {
  const { stats } = useLibrary();

  return (
    <Fade in timeout={400}>
      <Box>
        <DashboardHeader />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total Books"
              value={stats.totalBooks}
              icon={<MenuBookIcon />}
              colorKey="primary"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Members"
              value={stats.totalMembers}
              icon={<PeopleIcon />}
              colorKey="success"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Issued Books"
              value={stats.issuedBooks}
              icon={<AssignmentIcon />}
              colorKey="warning"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Overdue"
              value={stats.overdueCount}
              icon={<WarningAmberIcon />}
              colorKey="error"
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <BorrowChart />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <RecentActivity />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <QuickActions />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
