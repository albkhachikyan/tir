export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "User",
    path: "/user",
  },
  {
    title: "Teacher",
    path: "/teacher",
  },
  {
    title: "Pupil",
    path: "/pupil",
  },
  {
    title: "Subject",
    path: "/subject",
  },
];
