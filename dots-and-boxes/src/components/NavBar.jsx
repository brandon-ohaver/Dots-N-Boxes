import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

class NavBar extends React.Component {
  render() {
    return (
      <Stack spacing={2} direction="column" style={{ textAlign: "center" }}>
        <Link to="/game" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="error" className="start">
            Play Game
          </Button>
        </Link>
        <Link to="/leaderboard" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="error" className="start">
            Leaderboard
          </Button>
        </Link>
        <Link to="/cheats" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="error" className="start">
            Secret Cheats!
          </Button>
        </Link>
      </Stack>
    );
  }
}

export default NavBar;
