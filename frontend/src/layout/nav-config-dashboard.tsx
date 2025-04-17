export type NavItem = {
  title: string;
  path: string;
  info?: React.ReactNode;
  roles: string[];
};

export const navData: NavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    roles: ["ADMIN", "TEACHER", "PUPIL"],
  },
  {
    title: "User",
    path: "/user",
    roles: ["ADMIN"],
  },
  {
    title: "Teacher",
    path: "/teacher",
    roles: ["ADMIN"],
  },
  {
    title: "Pupil",
    path: "/pupil",
    roles: ["ADMIN", "TEACHER"],
  },
  {
    title: "Subject",
    path: "/subject",
    roles: ["ADMIN", "TEACHER", "PUPIL"],
  },
];
