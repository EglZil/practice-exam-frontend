import { Container } from "@mui/system";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("api/v1/employees")
      .then((employee) => employee.json())
      .then(setEmployees);
  };

  const handleDelete = (id) => {
    fetch("api/v1/employees/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicatioin/json",
      },
    }).then(fetchEmployees);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container rowSpacing={3}>
          <Grid item sm={10}>
            <h3>Employee List</h3>
          </Grid>
          <Grid item sm={2}>
            <Link to="/employees/create">
              <Stack direction="row" justifyContent="flex-end">
                <Button id="create-new-subject" variant="contained">
                  Add new employee
                </Button>
              </Stack>
            </Link>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Service</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.surname}</TableCell>
                  <TableCell>{employee.city}</TableCell>
                  <TableCell>{employee.specialization}</TableCell>
                  {employee.manager ? (
                    <TableCell>true</TableCell>
                  ) : (
                    <TableCell>false</TableCell>
                  )}
                  <TableCell>{employee.carService.name}</TableCell>
                  <TableCell>
                    <Link to={"/employees/view/" + employee.id}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={"/employees/edit/" + employee.id}>
                      <Button variant="contained">Edit</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
