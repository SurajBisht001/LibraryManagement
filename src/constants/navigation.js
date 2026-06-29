import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    title: "Books",
    path: "/books",
    icon: MenuBookIcon,
  },
  {
    title: "Members",
    path: "/members",
    icon: PeopleIcon,
  },
  {
    title: "Issue Book",
    path: "/issue",
    icon: AssignmentIcon,
  },
  {
    title: "Return Book",
    path: "/return",
    icon: KeyboardReturnIcon,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChartIcon,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];