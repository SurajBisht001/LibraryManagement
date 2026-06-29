    import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";

export default function QuickActions() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Quick Actions
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mt={2}
          flexWrap="wrap"
        >
          <Button variant="contained">
            Add Book
          </Button>

          <Button variant="contained">
            Issue Book
          </Button>

          <Button variant="contained">
            Add Member
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}