import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  ButtonGroup,
  Pagination,
  TablePagination,
  Tooltip,
} from "@mui/material";
import {
  DataGridPremium,
  GridToolbar,
  GridToolbarContainer,
  useGridApiRef,
  type GridColDef,
  type GridFilterModel,
  type GridPaginationModel,
  type GridRowParams,
} from "@mui/x-data-grid-premium";

import { pokedex } from "../utils/pokedex";

const generateNewRow = () => {
  return {
    id: Date.now(),
    sprite: "https://placehold.co/40x40.png",
    name: {
      english: "",
      japanese: "",
      chinese: "",
      french: "",
    },
    type: [],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      Speed: 0,
    },
    species: "",
  };
};

const DataGrid: React.FC = () => {
  const navigate = useNavigate();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(pokedex);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const totalPages = useMemo(() => {
    return Math.ceil(rows.length / paginationModel.pageSize);
  }, [rows.length, paginationModel.pageSize]);

  const handleAddRow = () => {
    const newRow = generateNewRow();
    setRows((prevRows: any) => [newRow, ...prevRows]);

    setTimeout(() => {
      apiRef.current.startRowEditMode({ id: newRow.id });
    });
  };

  const handleUpdateRow = (updatedRow: any) => {
    setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
  };

  const handleDeleteRows = (selectedRowIds: number[]) => {
    setRows(rows.filter((row) => !selectedRowIds.includes(row.id)));
  };

  const handlePageSize = () => {
    return apiRef.current.setPageSize(15);
  };

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/datagrid/${params.id}`);
  };

  const handlePaginationChange = (_: unknown, value: number) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: value - 1,
    }));
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <GridToolbar />
          <ButtonGroup>
            {selectedRows.length > 0 && (
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={() => handleDeleteRows(selectedRows)}
              >
                Delete a row(s)
              </Button>
            )}
            <Button
              size="small"
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={handleAddRow}
            >
              Add a row
            </Button>
            <Tooltip title="Test API Grid">
              <Button size="small" variant="outlined" onClick={handlePageSize}>
                Page size 15
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </GridToolbarContainer>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: ({ row, value }) => (
        <img
          alt={row.name}
          src={value?.sprite || "https://placehold.co/40x40.png"}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      hideable: false,
      editable: true,
      valueGetter: (value: any) => value.english,
      valueSetter: (value: any, row: any) => {
        return {
          ...row,
          name: { ...row.name, english: value },
        };
      },
    },
    {
      field: "species",
      headerName: "Species",
      width: 170,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      renderCell: ({ value }) => value.join(", "),
    },
    {
      field: "base",
      headerName: "Base",
      width: 250,
      renderCell: ({ value }) =>
        `HP: ${value?.HP}, Attack: ${value?.Attack}, Defense: ${value?.Defense}`,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      hideable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteRows([row.id]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <DataGridPremium
        apiRef={apiRef}
        // data
        rows={rows}
        columns={columns}
        // pagination
        pagination
        paginationMode="client"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        // toolbar
        slots={{ toolbar: CustomToolbar }}
        // filter
        headerFilters
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        // select
        checkboxSelection
        onRowSelectionModelChange={(ids) => setSelectedRows(ids as number[])}
        isRowSelectable={({ row }: GridRowParams) => row.base?.HP >= 40} // INFO: there is no specific reason for this.
        // edit
        editMode="row"
        processRowUpdate={(newRow: any, oldRow: any) => {
          if (!newRow.name.english) {
            return oldRow;
          }

          handleUpdateRow(newRow);
          return newRow;
        }}
        // redirect
        onRowClick={handleRowClick}
      />

      <TablePagination
        component="div"
        count={rows.length}
        page={paginationModel.page}
        onPageChange={(_: unknown, page: number) =>
          setPaginationModel({ ...paginationModel, page })
        }
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        rowsPerPage={paginationModel.pageSize}
        onRowsPerPageChange={(event) =>
          setPaginationModel({
            page: 0,
            pageSize: Number(event.target.value),
          })
        }
      />

      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Pagination
          count={totalPages}
          siblingCount={1}
          boundaryCount={1}
          page={paginationModel.page + 1}
          onChange={handlePaginationChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </>
  );
};

export default DataGrid;
