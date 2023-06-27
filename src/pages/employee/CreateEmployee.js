import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useHref } from "react-router-dom";

export function CreateEmployee() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [services, setServices] = useState([]);
  const [carService, setService] = useState("");
  const listUrl = useHref("/employees");

  useEffect(() => {
    fetch("api/v1/services")
      .then((service) => service.json())
      .then(setServices);
  }, []);

  const handleCheck = (event) => {
    setIsManager(event.target.checked);
  };

  const handleCreate = () => {
    fetch(`api/v1/employees/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        city,
        specialization,
        isManager,
        carService,
      }),
    }).then(() => (window.location = listUrl));
  };

  return (
    <Container>
      <h3>Create new employee</h3>
      <form>
        <Grid container rowSpacing={2}>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Employee name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Employee surname"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="City"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Specialization"
              id="specialization"
              name="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8}>
            <FormControlLabel
              label="Manager"
              control={<Checkbox onChange={handleCheck}></Checkbox>}
            ></FormControlLabel>
          </Grid>
          <Grid item sm={8}>
            <FormControl fullWidth required>
              <InputLabel id="service-label">Car Service</InputLabel>
              <Select
                label="Car Service"
                labelId="service-label"
                id="carService"
                value={carService}
                onChange={(e) => {
                  setService(e.target.value);
                }}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8} marginTop={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleCreate}>
                Create
              </Button>
              <Link to="/employees">
                <Button variant="contained">Back</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
