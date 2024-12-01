"use client";

import { BpCheckbox } from "@/components/Checked";
import useInput from "@/components/Home/useInput";
import { TableViewProps } from "@/interface";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns";

const TableView = ({ rows }: TableViewProps) => {
  const { handleDeleteTodo } = useInput();
  const columns: GridColDef[] = [
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "status-header",
      renderCell: (params: GridRenderCellParams) => (
        <BpCheckbox
          checked={params.row.status === "Done"}
          inputProps={{ "aria-label": "Unfinished" }}
        />
      ),
    },
    { field: "title", headerName: "Title", headerClassName: "status-header",width: 250 },
    {
      field: "dueDate",
      headerName: "Due Date",
      headerClassName: "status-header",
      width: 200,
      valueGetter: (_, row) => {
        const date = row.dueDate;
        return date ? format(new Date(date), "yyyy-MM-dd") : "";
      },
    },
    {
      field: "_id",
      headerName: "",
      headerClassName: "status-header",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() =>
              handleDeleteTodo(params.row._id, params.row.createdBy)
            }
            sx={{ color: "crimson" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default TableView;
