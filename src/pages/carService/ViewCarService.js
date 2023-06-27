import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

export function ViewCarService() {
  const [service, setService] = useState({});
  const [employees, setEmployees] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/services/" + params.id)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, []);

  useEffect(() => {
    fetch("api/v1/services/employees/" + params.id)
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div>
      <Container>
        <Grid container rowSpacing={4}>
          <header>
            <h1>{service.title}</h1>
            <p>{service.address}</p>
          </header>
        </Grid>
        <Grid item sm={12}>
          <h4>Employees</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Manager</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.surname}</TableCell>
                    <TableCell>{employee.city}</TableCell>
                    <TableCell>{employee.specialization}</TableCell>
                    <TableCell>{employee.isManager}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid marginTop={2}>
          <Link to="/services">
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>
      </Container>
    </div>
  );
}
