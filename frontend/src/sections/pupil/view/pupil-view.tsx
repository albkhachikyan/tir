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
import { PupilTableRow } from "../pupil-table-row";
import { PupilTableHead } from "../pupil-table-head";
import { TableEmptyRows } from "../table-empty-rows";
import { UserTableToolbar } from "../pupil-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

import type { PupilProps } from "../pupil-table-row";
import { useTable } from "../../../hooks/table/useTable";
import { usePupil } from "../../../hooks/pupil/usePupil";

export function PupilView() {
  const table = useTable();
  const { data: pupils = [], isLoading, isError } = usePupil();

  const [filterName, setFilterName] = useState("");

  const dataFiltered: PupilProps[] = applyFilter({
    inputData: pupils,
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
          Pupils
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Pupil
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
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
                <Alert severity="error">Failed to load pupils</Alert>
              </Box>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <PupilTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  onSort={table.onSort}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "grade", label: "Grade" },
                    { id: "subject", label: "Subject" },
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
                      <PupilTableRow
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
                      pupils.length
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
          count={pupils.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
