'use client';

import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error.message || 'An error occurred while loading the page.'}
        </Typography>
        <Button
          variant="contained"
          onClick={reset}
          color="primary"
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
} 