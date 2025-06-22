'use client';

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { addGrade } from "@/services/actions";
import { useGradeForm } from "@/hooks/useGradeForm";
import { useActionState } from 'react';

const initialState = undefined;

export default function AddGradeForm() {
  const { grade, error, handleGradeChange } = useGradeForm();
  const [state, formAction] = useActionState(addGrade, initialState);

  return (
    <form action={formAction}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, maxWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel id="class-select-label">Class</InputLabel>
          <Select
            labelId="class-select-label"
            name="class"
            defaultValue="Math"
            label="Class"
            required
          >
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="grade"
          label="Grade (0-100)"
          type="number"
          variant="outlined"
          required
          value={grade}
          onChange={handleGradeChange}
          error={!!error}
          helperText={error}
          inputProps={{ min: 0, max: 100 }}
        />
        <Button type="submit" variant="contained" disabled={!!error}>
          Add Grade
        </Button>
        {state?.error && <Typography color="error" sx={{ mt: 1 }}>{state.error}</Typography>}
      </Box>
    </form>
  );
} 