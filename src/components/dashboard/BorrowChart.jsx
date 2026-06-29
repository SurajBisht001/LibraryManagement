import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", issued: 40 },
  { month: "Feb", issued: 55 },
  { month: "Mar", issued: 70 },
  { month: "Apr", issued: 65 },
  { month: "May", issued: 90 },
  { month: "Jun", issued: 75 },
];

export default function BorrowChart() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Monthly Book Issues
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={data}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="issued"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}