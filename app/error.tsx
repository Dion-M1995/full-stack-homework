'use client'; 

import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

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
    <Container>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          An unexpected error occurred. Please try again.
        </Typography>
        <Button
          variant="contained"
          onClick={
            () => reset()
          }
        >
          Try again
        </Button>
      </Box>
    </Container>
  );
} 