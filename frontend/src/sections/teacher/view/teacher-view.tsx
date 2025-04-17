import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { DashboardContent } from "../../../layout/dashboard";
import { Scrollbar } from "../../../components/scrollbar";

import { TableNoData } from "../table-no-data";
import { TeacherTableRow } from "../teacher-table-row";
import { TeacherTableHead } from "../teacher-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { TeacherTableToolbar } from "../teacher-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

import { useTeachers } from "../../../hooks/teacher/useTeacher";
import { useTable } from "../../../hooks/table/useTable";

import type { TeacherProps } from "../teacher-table-row";

export function TeacherView() {
  const table = useTable();
  const { data: teachers = [], isLoading, isError } = useTeachers();

  useEffect(() => {
    console.log("teachers", teachers);
  }, [teachers]);

  const [filterName, setFilterName] = useState("");

  const dataFiltered: TeacherProps[] = applyFilter({
    inputData: teachers,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Teacher
        </Typography>
      </Box>

      <Card>
        <TeacherTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                <Alert severity="error">Failed to load teachers</Alert>
              </Box>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <TeacherTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  onSort={table.onSort}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "subject", label: "Subject" },
                    { id: "actions", label: "Actions", align: "right" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <TeacherTableRow
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
                      teachers.length
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
          count={teachers.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
