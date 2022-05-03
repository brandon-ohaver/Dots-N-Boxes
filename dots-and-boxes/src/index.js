import React from "react";
import ReactDOM from "react-dom";
import MainMenu from "./containers/MainMenu.jsx";
import Leaderboard from "./containers/Leaderboard";
import SinglePlayerGame from "./containers/SinglePlayerGame.jsx";
import MultiPlayerGame from "./containers/MultiPlayerGame.jsx";
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
      $(".play").hide();
      $(".playGame").hide();
    });
  });

  $(document).ready(function () {
    $("button.back").click(function () {
      $(".start").show();
      $(".play").show();
      $(".playGame").hide();
    });
  });

  $(document).ready(function () {
    $(".play").click(function () {
        $(".playGame").show();
      })
    })
  
    $(document).ready(function () {
      $(".playGame").click(function () {
        $(".playGame").hide();
        $(".start").hide();
        $('.play').hide();
      })
    })
    
  return (
    <BrowserRouter>
      <h1 style={{ textAlign: "center" }}>Dots-N-Boxes!</h1>
      <NavBar />
      <Routes>
        <Route element={<MainMenu />} exact path="/main-menu" /> 
        <Route element={<Leaderboard />} exact path="/leaderboard" />
        <Route element={<SinglePlayerGame />} exact path="/single-player-game" />
        <Route element={<MultiPlayerGame />} exact path="/multi-player-game" />
        <Route element={<Cheats />} exact path="/cheats" />
      </Routes>
      <BackButton exact path="/" />
    </BrowserRouter>
  );
};

ReactDOM.render(<AppContainer />, document.querySelector("#root"));
