import React from 'react';
import ReactDOM from 'react-dom';
import MainMenu from './containers/MainMenu.jsx'
import Leaderboard from './containers/Leaderboard'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const AppContainer = () => {
  return(
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<MainMenu />} exact path='/main-menu'/>
          <Route element={<Leaderboard />} exact path='/leaderboard'/>
        </Routes>
      </BrowserRouter>
  )
  
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'))