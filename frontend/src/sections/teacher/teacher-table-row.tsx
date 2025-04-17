import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { Iconify } from "../../components/iconify";
import { AssignSubjectPopover } from "../../components/popover/AssignSubjectPopover";

export type TeacherProps = {
  id: string;
  name: string;
  subjects?: {
    id: string;
    name: string;
    grade: number;
  }[];
};

type TeacherTableRowProps = {
  row: TeacherProps;
  selected: boolean;
};

export function TeacherTableRow({ row, selected }: TeacherTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const [assignAnchor, setAssignAnchor] = useState<HTMLElement | null>(null);
  const openAssignPopover = Boolean(assignAnchor);

  const handleOpenAssign = (event: React.MouseEvent<HTMLElement>) => {
    setAssignAnchor(event.currentTarget);
  };

  const handleCloseAssign = () => {
    setAssignAnchor(null);
  };

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const getSubjectNames = (
    subjects: { id: string; name: string; grade: number }[]
  ) => {
    if (subjects.length > 0) {
      return subjects.map((subject) => subject.name).join(", ");
    } else {
      return "No Subject";
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            {row.name}
          </Box>
        </TableCell>
        <TableCell>{getSubjectNames(row.subjects || [])}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: "action.selected" },
            },
          }}
        >
          <MenuItem onClick={handleOpenAssign}>Assign Subject</MenuItem>

          <AssignSubjectPopover
            open={openAssignPopover}
            anchorEl={assignAnchor}
            onClose={handleCloseAssign}
            teacherId={row.id}
          />
        </MenuList>
      </Popover>
    </>
  );
}
