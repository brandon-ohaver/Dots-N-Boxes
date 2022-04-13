import React from "react";
import ReactDOM from "react-dom";
import MainMenu from "./containers/MainMenu.jsx";
import Leaderboard from "./containers/Leaderboard";
import Game from "./containers/Game.jsx";
import Cheats from "./containers/Cheats.jsx";
import NavBar from "./components/NavBar";
import BackButton from "./components/BackButton"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import $ from "jquery";
import "./index.css"


const AppContainer = () => {
  $(document).ready(function () {
    $("button.start").click(function () {
      $(".start").hide();
    });
  });

  $(document).ready(function () {
    $("button.back").click(function () {
      $(".start").show();
    });
  });

  return (
    <BrowserRouter>
      <h1 style={{ textAlign: "center" }}>Dots-N-Boxes!</h1>
      <NavBar />
      <Routes>
        <Route element={<MainMenu />} exact path="/main-menu" /> 
        <Route element={<Leaderboard />} exact path="/leaderboard" />
        <Route element={<Game />} exact path="/game" />
        <Route element={<Cheats />} exact path="/cheats" />
      </Routes>
      <BackButton exact path="/" />
    </BrowserRouter>
  );
};

ReactDOM.render(<AppContainer />, document.querySelector("#root"));
