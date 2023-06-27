import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function EditCarService() {
  const [service, setService] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch("api/v1/services/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        setService(data);
        setName(data.name);
        setAddress(data.address)
      });
  }, []);

  const handleEdit = () => {
    fetch("api/v1/services/update/" + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
      }),
    }).then((result) => {
      if (!result.ok) {
        setError("Error occured");
      } else {
        setError("");
        setMessage("Updated successfuly");
      }
    });
  };

  return (
    <Container>
      <h3>Edit car service: {service.name}</h3>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <form>
        <Grid container rowSpacing={2}>
          <Grid item sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Service name"
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
              label="Service address"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item sm={8} marginTop={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Link to="/services">
                <Button variant="contained">Back</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
