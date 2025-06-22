'use client';

import { Box, Button, TextField, Typography } from "@mui/material";
import { addNumber } from "@/services/actions";
import { useActionState } from 'react';

const initialState = undefined;

export default function AddNumberForm() {
  const [state, formAction] = useActionState(addNumber, initialState);

  return (
    <form action={formAction}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="number"
            label="Enter an integer"
            type="number"
            variant="outlined"
            required
            fullWidth
          />
          <Button type="submit" variant="contained">Add Number</Button>
        </Box>
        {state?.error && <Typography color="error">{state.error}</Typography>}
      </Box>
    </form>
  );
} 