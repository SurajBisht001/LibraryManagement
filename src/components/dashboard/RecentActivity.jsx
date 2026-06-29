import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useLibrary } from "../../context/LibraryContext";

export default function RecentActivity() {
  const { recentActivity } = useLibrary();

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="text.primary">
          Recent Activity
        </Typography>

        {recentActivity.length === 0 ? (
          <Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>
            No activity yet.
          </Typography>
        ) : (
          <List disablePadding sx={{ mt: 1 }}>
            {recentActivity.map((activity, index) => (
              <div key={index}>
                <ListItem disablePadding sx={{ py: 1.75 }}>
                  <ListItemText
                    primary={activity}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  />
                </ListItem>
                {index < recentActivity.length - 1 && <Divider sx={{ my: 0.5 }} />}
              </div>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
