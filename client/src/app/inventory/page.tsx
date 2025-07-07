"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 120 },

  { field: "name", headerName: "Product Name", flex: 1, minWidth: 180 },

  {
    field: "price",
    headerName: "Price",
    width: 120,
    type: "number",
    valueGetter: (value, row) => `$${row.price.toFixed(2)}`,
  },

  {
    field: "rating",
    headerName: "Rating",
    width: 120,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },

  {
    field: "stockQuantity",
    headerName: "Quantity",
    width: 130,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex justify-center items-center text-red-500 py-10">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col  px-4 sm:px-8 py-6">
      <Header name="Inventory" />

      <div className="w-full mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
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

export default Inventory;
