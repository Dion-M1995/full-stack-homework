import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getNumberPairs } from "@/services/database";
import AddNumberForm from "@/components/AddNumberForm";

export default async function NumbersPage() {
  const pairs = await getNumberPairs();
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Number Pairs</Typography>
      <AddNumberForm />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID 1</TableCell>
              <TableCell>Number 1</TableCell>
              <TableCell>ID 2</TableCell>
              <TableCell>Number 2</TableCell>
              <TableCell>Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs.map((pair: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{pair.id1}</TableCell>
                <TableCell>{pair.number1}</TableCell>
                <TableCell>{pair.id2}</TableCell>
                <TableCell>{pair.number2}</TableCell>
                <TableCell>{pair.sum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
