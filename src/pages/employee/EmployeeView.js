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

export function EmployeeView() {
  const [employee, setEmployee] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/employees/" + params.id)
      .then((response) => response.json())
      .then((data) => setEmployee(data));
  }, []);

  return (
    <div>
      <Container>
        <Grid container rowSpacing={4}>
          <header>
            <h1>
              {employee.name} {employee.surname}
            </h1>
          </header>
        </Grid>
        <Grid item sm={12}>
          <p>City: {employee.city}</p>
        </Grid>
        <Grid item sm={12}>
          {employee.manager ? <p>Manager: true</p> : <p>Manager: false</p>}
        </Grid>
        <Grid item sm={12}>
          <p>Specialization: {employee.specialization}</p>
        </Grid>
        <Grid item sm={12}>
          <p>
            Works at car service:{" "}
            {employee.carService && employee.carService.name}
          </p>
        </Grid>
        <Grid marginTop={2}>
          <Link to="/employees">
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>
      </Container>
    </div>
  );
}
