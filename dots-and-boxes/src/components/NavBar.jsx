import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

class NavBar extends React.Component {
  render() {
    return (
      <>
        <Stack spacing={2}>
          <div>
          <Stack direction="column" style={{ textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="error" className="play">
              Play Game
            </Button>
          </Link>
          </Stack>
          <Stack spacing={2} direction="row" style={{ justifyContent: "center", marginTop: "1%", display: "none" }} className="playGame">
            <Link to="/single-player-game" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="error">
                Singleplayer
              </Button>
            </Link>
            <Link to="/multi-player-game" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="error">
                Multiplayer
              </Button>
            </Link>
          </Stack>
        </div>
        </Stack>
      </>
      
        
    );
  }
}

export default NavBar;
