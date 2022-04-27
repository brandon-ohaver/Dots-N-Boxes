import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

class BackButton extends React.Component {
  render() {
    return (
      <Stack spacing={2} direction="column" style={{ alignContent: "center", display: "flex", textAlign: "center", marginRight: "300px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="error" className="back">
            Back
          </Button>
        </Link>
      </Stack>
    );
  }
}

export default BackButton;