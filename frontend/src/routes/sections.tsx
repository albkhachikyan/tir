import type { RouteObject } from "react-router";

import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { AuthLayout, RequireAuth } from "../layout/auth";
import { DashboardLayout } from "../layout/dashboard";

export const DashboardPage = lazy(() => import("../pages/dashboard"));
export const UserPage = lazy(() => import("../pages/user"));
export const SignInPage = lazy(() => import("../pages/sign-in"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const TeacherPage = lazy(() => import("../pages/teacher"));
export const PupilPage = lazy(() => import("../pages/pupil"));
export const SubjectPage = lazy(() => import("../pages/subject"));

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) =>
          varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <RequireAuth>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "user", element: <UserPage /> },
      { path: "teacher", element: <TeacherPage /> },
      { path: "pupil", element: <PupilPage /> },
      { path: "subject", element: <SubjectPage /> },
    ],
  },
  {
    path: "sign-in",
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: "404",
    element: <Page404 />,
  },
  { path: "*", element: <Page404 /> },
];
