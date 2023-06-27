import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useHref } from "react-router-dom";

export function CreateCarService() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const listUrl = useHref("/services");

  const handleCreate = () => {
    fetch("/api/v1/services/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
      }),
    })
      .then(applyResult)
      .then(() => (window.location = listUrl));
  };

  const applyResult = (result) => {
    if (result.ok) {
      clear();
    } else {
      window.alert("Nepavyko sukurti: " + result.status);
    }
  };

  const clear = () => {
    setName("");
    setAddress("");
  };

  return (
    <Container>
      <h3>Create new car service</h3>
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
              <Button variant="contained" onClick={handleCreate}>
                Create
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
