import Grid from "@mui/material/Grid";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import BorrowChart from "../components/dashboard/BorrowChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Books"
            value="1250"
            icon={<MenuBookIcon />}
            color="#2563EB"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Members"
            value="356"
            icon={<PeopleIcon />}
            color="#10B981"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Issued Books"
            value="420"
            icon={<AssignmentIcon />}
            color="#F59E0B"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Overdue"
            value="18"
            icon={<WarningAmberIcon />}
            color="#EF4444"
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <BorrowChart />
        </Grid>

        <Grid item xs={12} lg={4}>
          <RecentActivity />
        </Grid>

        <Grid item xs={12}>
          <QuickActions />
        </Grid>
      </Grid>
    </>
  );
}