import React, { useState } from 'react'
import './Home.scss'

import AppDrawer from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';
import Board from "./Board/Board";

function Home(props) {
    const [state, setState] = useState({
        AppDrawer: {
            open: false,
        }
    });

    function handleOpenAppDrawer() {
        setState({
            ...state,
            AppDrawer: {
                ...AppDrawer,
                open: !state.AppDrawer.open,
            }
        })
    }
    return (
        <div className='home-container'>
            <NavBar 
            onButtonMenuClick={handleOpenAppDrawer} />
            <AppDrawer
            open={state.AppDrawer.open}
            onClose={handleOpenAppDrawer}
            />
            <Board/>
        </div>
    )
}

export default Home

