import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { DashboardContent } from "../../../layout/dashboard";
import { Iconify } from "../../../components/iconify";
import { Scrollbar } from "../../../components/scrollbar";

import { TableNoData } from "../table-no-data";
import { SubjectTableRow } from "../subject-table-row";
import { TeacherTableHead } from "../subject-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { SubjectTableToolbar } from "../subject-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

import { useSubject } from "../../../hooks/subject/useSubject";
import { useTable } from "../../../hooks/table/useTable";

import type { SubjectProps } from "../subject-table-row";

export function SubjectView() {
  const table = useTable();
  const { data: subjects = [], isLoading, isError } = useSubject();

  const [filterName, setFilterName] = useState("");

  const dataFiltered: SubjectProps[] = applyFilter({
    inputData: subjects,
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
          Subjects
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New subjects
        </Button>
      </Box>

      <Card>
        <SubjectTableToolbar
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
                <Alert severity="error">Failed to load subjects</Alert>
              </Box>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <TeacherTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  onSort={table.onSort}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "subjects", label: "Subject" },
                    { id: "", label: "Actions", align: "right" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <SubjectTableRow
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
                      subjects.length
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
          count={subjects.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
