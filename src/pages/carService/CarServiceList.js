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
import { useEffect, useState } from "react";

export function CarServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    fetch("api/v1/services")
      .then((service) => service.json())
      .then(setServices);
  };

  const handleDelete = (id) => {
    fetch("api/v1/services/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicatioin/json",
      },
    }).then(fetchServices);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container rowSpacing={3}>
          <Grid item sm={10}>
            <h3>Service List</h3>
          </Grid>
          <Grid item sm={2}>
            <Link to="/services/create">
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained">Add new car service</Button>
              </Stack>
            </Link>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service name</TableCell>
                <TableCell>Service address</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.address}</TableCell>
                  <TableCell>
                    <Link to={"/services/view/" + service.id}>
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={"/services/edit/" + service.id}>
                      <Button variant="contained">Edit</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(service.id)}
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
