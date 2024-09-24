import React from "react";
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";

import { pokedex } from "../utils/pokedex";

const DataGridComponent: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      sortable: false,
      hideable: false,
      renderCell: ({ row, value }) => <img alt={row.name} src={value.sprite} />,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      hideable: false,
      valueGetter: (value: { english: string }) => value.english,
    },
    {
      field: "type",
      headerName: "Type",
      width: 110,
      renderCell: ({ value }) => value.join(", "),
    },
  ];

  return (
    <DataGrid
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      rows={pokedex}
      columns={columns}
      slots={{ toolbar: GridToolbar }}
    />
  );
};

export default DataGridComponent;
