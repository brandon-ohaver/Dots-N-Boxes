import React from "react";

const Cheats = () => {
  return (
    <>

      <h2 style={{ textAlign: "center", marginLeft: "25%", marginRight: "25%", color: "white", fontFamily: "Tahoma" }}>Congratulations!!! You managed to find the secret to always winning in Dots-N-Boxes!</h2>
      <p style={{ textAlign: "center", marginLeft: "25%", marginRight: "25%", color: "white", fontFamily: "Tahoma" }}>
        The strategy to winning a game of Dots-N-Boxes is through chaining. Chaining is the players ability to
        <br />
        create long chains of unfilled boxes where a single unfilled box has two sides that are filled parallel
        <br />
        to eachother and those parallel sides are linked to other unfilled boxes. A chain of unfilled boxes consists
        <br />
        of three or more unfilled boxes. Player 1 will strive to have more even chains whereas Player 2 will
        <br />
        strive to have more odd chains in order to win.
      </p>
    </>
  );
};

export default Cheats;
