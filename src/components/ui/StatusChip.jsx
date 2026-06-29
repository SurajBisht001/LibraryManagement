import { Chip } from "@mui/material";

const colorMap = {
  Available: "success",
  Issued: "warning",
  Active: "success",
  Returned: "default",
  Overdue: "error",
  Inactive: "default",
  Student: "primary",
  Faculty: "secondary",
  Public: "info",
};

export default function StatusChip({ label, size = "small" }) {
  return (
    <Chip
      label={label}
      size={size}
      color={colorMap[label] || "default"}
      variant={label === "Inactive" ? "outlined" : "filled"}
    />
  );
}
