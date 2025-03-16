import { Box, Drawer, Typography, Divider, IconButton } from "@mui/material";
import { UserAvatar } from "@/components/user-avatar/user-avatar";
import { ErrorBoundary } from "@/components/error-boundry/error-boundry";
import { TodoList } from "@/components/todo-list/todo-list";
import CloseIcon from '@mui/icons-material/Close';

import type { AddressLookupDrawerProps } from "./types";

export const AddressLookupDrawer = ({ selectedUser, onClose }: AddressLookupDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={selectedUser !== null}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '400px',
          padding: 3,
        },
      }}
    >
      {selectedUser && (
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <UserAvatar name={selectedUser.name} />
            <Typography variant="h6">
              {selectedUser.name}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" fontWeight="bold">
            Email
          </Typography>
          <Typography>
            {selectedUser.email}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Address
          </Typography>
          <Typography>
            {selectedUser.address?.street}<br />
            {selectedUser.address?.suite && (
              <>
                {selectedUser.address.suite}<br />
              </>
            )}
            {selectedUser.address?.city}, {selectedUser.address?.zipcode}
          </Typography>

          <Divider sx={{ my: 2 }} />
          
          <ErrorBoundary>
            <TodoList userId={selectedUser.id} />
          </ErrorBoundary>
        </Box>
      )}
    </Drawer>
  );
} 