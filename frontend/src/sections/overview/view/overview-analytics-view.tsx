import Typography from "@mui/material/Typography";

import { DashboardContent } from "../../../layout/dashboard";

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>
    </DashboardContent>
  );
}
