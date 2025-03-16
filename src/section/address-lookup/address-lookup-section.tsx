"use client";

import { useState, useMemo } from "react";
import { Container, Box, Autocomplete, TextField } from "@mui/material";
import { DataGrid, type GridColDef, type GridRowParams } from "@mui/x-data-grid";
import type { UserData } from "./types";
import { AddressLookupDrawer } from "./address-lookup-drawer";
import { formatName } from "@/utils/format-name";

const AddressLookupSection = ({ initialData }: { initialData: UserData[] }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Define columns for the data grid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
  ];

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return initialData;
    
    return initialData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialData, searchQuery]);

  const handleRowClick = (params: GridRowParams) => {
    const user = initialData.find(u => u.id === params.id);
    setSelectedUser(user || null);
  };

  return (
    <Container maxWidth="lg">
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          gap: 4
        }}
      >
        {/* Search box */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <Autocomplete
            freeSolo
            options={initialData
              .map((user) => formatName(user.name))
              .sort((a, b) => a.localeCompare(b))
            }
            onChange={(_, newValue) => {
              // Convert formatted name back to original format for search
              setSearchQuery(newValue ? newValue.split(',')[0].split(' ')[0] : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search users"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>

        {/* Data Grid */}
        <Box sx={{ width: '100%', height: 400, mb: 4}}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            onRowClick={handleRowClick}
          />
        </Box>

        <AddressLookupDrawer
          selectedUser={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </Box>
    </Container>
  );
}

export default AddressLookupSection;
