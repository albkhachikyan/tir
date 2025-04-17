import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { Iconify } from "../../components/iconify";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
};

export function UserTableRow({ row, selected }: UserTableRowProps) {
  const { mutate: deleteUser } = useDeleteUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [editMode, setEditMode] = useState(false);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
    setEditMode(false);
  }, []);

  const onUserDelete = () => {
    deleteUser({ id: row.id });
    handleClosePopover();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{row.role}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!anchorEl && !editMode}
        anchorEl={anchorEl}
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
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: "action.selected",
              },
            },
          }}
        >
          <MenuItem onClick={onUserDelete} sx={{ color: "error.main" }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
