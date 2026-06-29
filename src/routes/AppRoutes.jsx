import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Members from "../pages/Members";
import IssueBook from "../pages/IssueBook";
import ReturnBook from "../pages/ReturnBook";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/issue" element={<IssueBook />} />
        <Route path="/return" element={<ReturnBook />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}