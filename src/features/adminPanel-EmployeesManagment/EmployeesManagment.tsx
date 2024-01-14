import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { userData, userTableHeaders } from "../../data/adminManagmentTableData/AdminManagmentUserData";

export default function EmployeesManagment() {
  return (
    <Box sx={{ height: 400 }} className="w-full overflow-x-auto">
      <DataGrid
        rows={userData}
        columns={userTableHeaders}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
