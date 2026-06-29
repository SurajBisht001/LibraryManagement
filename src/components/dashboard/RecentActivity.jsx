import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const activities = [
  "Harry Potter issued to Rahul",
  "Atomic Habits returned",
  "New member registered",
  "The Alchemist added",
  "Database backup completed",
];

export default function RecentActivity() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Recent Activity
        </Typography>

        <List>
          {activities.map((activity, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={activity} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}