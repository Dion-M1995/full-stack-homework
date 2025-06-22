import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getRecentGrades } from "@/services/database";
import AddGradeForm from "@/components/AddGradeForm";
import ClientDate from "@/components/ClientDate";

export default async function GradesPage() {
  const recentGrades = await getRecentGrades();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Grades Management</Typography>
      <AddGradeForm />
      
      <Typography variant="h5" gutterBottom>Recent Grades</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentGrades.map((grade: any) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.id}</TableCell>
                <TableCell>{grade.class_name}</TableCell>
                <TableCell>{grade.grade}</TableCell>
                <TableCell><ClientDate dateString={grade.created_at} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
