import { Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useLibrary } from "../../context/LibraryContext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default function BorrowChart() {
  const theme = useTheme();
  const { transactions } = useLibrary();

  const data = useMemo(() => {
    const counts = MONTHS.map((month, index) => ({ month, issued: 0 }));

    transactions.forEach((t) => {
      const monthIndex = dayjs(t.issueDate).month();
      if (monthIndex < 6) {
        counts[monthIndex].issued += 1;
      }
    });

    return counts;
  }, [transactions]);

  const axisColor = theme.palette.text.secondary;
  const gridColor = theme.palette.divider;

  return (
    <Card>
      <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary" sx={{ mb: 2 }}>
                  Monthly Book Issues
                </Typography>

                <Box sx={{ mt: 2 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
                color: theme.palette.text.primary,
              }}
            />
            <Bar
              dataKey="issued"
              fill={theme.palette.primary.main}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
                </Box>
      </CardContent>
    </Card>
  );
}
