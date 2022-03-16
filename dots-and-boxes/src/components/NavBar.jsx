import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
            <>
                <Link to='/main-menu'>
                    <button>Main Menu</button>
                </Link>
                <Link to='/leaderboard'>
                    <button>Leaderboard</button>
                </Link>
            </>
        )
    }
}

export default NavBar