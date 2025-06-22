import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
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
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Full Stack Assessment
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          This application demonstrates proficiency in React, Next.js, and PostgreSQL.
        </Typography>
        <Typography variant="body1" paragraph>
          Navigate to the different pages to test the features.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" component={Link} href="/numbers">
            Go to Numbers
          </Button>
          <Button variant="outlined" color="primary" component={Link} href="/grades">
            Go to Grades
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 