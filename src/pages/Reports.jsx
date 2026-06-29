import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import dayjs from "dayjs";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import StatusChip from "../components/ui/StatusChip";
import { useLibrary } from "../context/LibraryContext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PIE_COLORS = ["#4338CA", "#0D9488", "#D97706", "#DC2626", "#6366F1", "#34D399"];

export default function Reports() {
  const theme = useTheme();
  const { books, transactions, stats, activeTransactions } = useLibrary();

  const axisColor = theme.palette.text.secondary;
  const gridColor = theme.palette.divider;

  const categoryData = useMemo(() => {
    const counts = {};
    books.forEach((book) => {
      counts[book.category] = (counts[book.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [books]);

  const monthlyIssues = useMemo(() => {
    const counts = MONTHS.map((month) => ({ month, issued: 0, returned: 0 }));

    transactions.forEach((t) => {
      const issueMonth = dayjs(t.issueDate).month();
      counts[issueMonth].issued += 1;
      if (t.returnDate) {
        const returnMonth = dayjs(t.returnDate).month();
        counts[returnMonth].returned += 1;
      }
    });

    return counts.slice(0, 6);
  }, [transactions]);

  const topBooks = useMemo(() => {
    const counts = {};
    transactions.forEach((t) => {
      const book = books.find((b) => b.id === t.bookId);
      if (book) {
        counts[book.title] = (counts[book.title] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [transactions, books]);

  const tooltipStyle = {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    color: theme.palette.text.primary,
  };

  return (
    <Fade in timeout={400}>
      <Box>
        <PageHeader
          title="Reports"
          subtitle="Library analytics and insights at a glance"
        />

        <Grid container spacing={4} mb={4}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total Issues"
              value={transactions.length}
              icon={<TrendingUpIcon />}
              colorKey="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Active Loans"
              value={stats.activeIssues}
              icon={<BarChartIcon />}
              colorKey="warning"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Overdue"
              value={stats.overdueCount}
              icon={<CategoryIcon />}
              colorKey="error"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total Fines"
              value={`₹${stats.totalFines}`}
              icon={<AttachMoneyIcon />}
              colorKey="success"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} mb={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Issue & Return Trends
                </Typography>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={monthlyIssues}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke={axisColor}
                      tick={{ fill: axisColor, fontSize: 12 }}
                      axisLine={{ stroke: gridColor }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke={axisColor}
                      tick={{ fill: axisColor, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar
                      dataKey="issued"
                      name="Issued"
                      fill={theme.palette.primary.main}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="returned"
                      name="Returned"
                      fill={theme.palette.secondary.main}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Books by Category
                </Typography>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Most Borrowed Books
                </Typography>
                {topBooks.length === 0 ? (
                  <Typography color="text.secondary" variant="body2">
                    No borrowing data yet.
                  </Typography>
                ) : (
                  <List disablePadding>
                    {topBooks.map((book, index) => (
                      <Box key={book.title}>
                        <ListItem disablePadding sx={{ py: 2, pr: 10 }}>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={1.5}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 12,
                                    fontWeight: 600,
                                  }}
                                >
                                  {index + 1}
                                </Typography>
                                {book.title}
                              </Box>
                            }
                            secondary={`${book.count} issue(s)`}
                          />
                        </ListItem>
                        {index < topBooks.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Overdue Items
                </Typography>
                {activeTransactions.filter((t) => t.isOverdue).length === 0 ? (
                  <Typography color="text.secondary" variant="body2">
                    No overdue books — everything is on track!
                  </Typography>
                ) : (
                  <List disablePadding>
                    {activeTransactions
                      .filter((t) => t.isOverdue)
                      .map((t, index, arr) => (
                        <Box key={t.id}>
                          <ListItem
                            disablePadding
                            sx={{ py: 2, pr: 12, alignItems: "flex-start" }}
                            secondaryAction={<StatusChip label="Overdue" />}
                          >
                            <ListItemText
                              primary={t.book?.title}
                              secondary={`${t.member?.name} · Due ${dayjs(t.dueDate).format("DD MMM YYYY")}`}
                              primaryTypographyProps={{ mb: 0.5 }}
                              secondaryTypographyProps={{ mt: 0.5 }}
                            />
                          </ListItem>
                          {index < arr.length - 1 && <Divider />}
                        </Box>
                      ))}
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
