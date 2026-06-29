import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="text.primary">
          Quick Actions
        </Typography>

        <Stack direction="row" spacing={2} mt={3} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/books")}
          >
            Add Book
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AssignmentTurnedInIcon />}
            onClick={() => navigate("/issue")}
          >
            Issue Book
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate("/members")}
          >
            Add Member
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
