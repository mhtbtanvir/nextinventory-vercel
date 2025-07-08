"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";

const columns: GridColDef[] = [
  { field: "UserId", headerName: "ID", width: 120 },

  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },

  { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className="flex justify-center items-center text-red-500 py-10">
        Failed to load users. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col  px-4 sm:px-8 py-6">
      <Header name="Users" />

      <div className="w-full mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              color: "#374151",
              fontSize: "1rem",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f3f4f6",
            },
            "& .MuiCheckbox-root": {
              color: "#3b82f6",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.95rem",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Users;
