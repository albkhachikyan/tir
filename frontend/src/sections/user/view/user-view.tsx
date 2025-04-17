import { useState } from "react";
import {
  Box,
  Card,
  Table,
  Button,
  Typography,
  TableBody,
  TableContainer,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";

import { DashboardContent } from "../../../layout/dashboard";
import { Iconify } from "../../../components/iconify";
import { Scrollbar } from "../../../components/scrollbar";

import { TableNoData } from "../table-no-data";
import { UserTableRow } from "../user-table-row";
import { UserTableHead } from "../user-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { UserTableToolbar } from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

import { useUsers } from "../../../hooks/users/useUser";
import { useTable } from "../../../hooks/table/useTable";
import { UserFormPopover } from "../../../components/popover/Popover";

import type { UserProps } from "../user-table-row";

export function UserView() {
  const table = useTable();
  const { data: users = [], isLoading, isError } = useUsers();

  const [filterName, setFilterName] = useState("");
  const [newUserAnchor, setNewUserAnchor] = useState<HTMLElement | null>(null);

  const handleOpenNewUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNewUserAnchor(e.currentTarget);
  };

  const handleCloseNewUser = () => {
    setNewUserAnchor(null);
  };

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenNewUser}
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            {isLoading ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Box sx={{ p: 3 }}>
                <Alert severity="error">Failed to load users</Alert>
              </Box>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  onSort={table.onSort}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "email", label: "Email" },
                    { id: "role", label: "Role" },
                    { id: "action", label: "Actions", align: "right" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      users.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <UserFormPopover anchorEl={newUserAnchor} onClose={handleCloseNewUser} />
    </DashboardContent>
  );
}
