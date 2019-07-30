import React, { useState } from 'react'
import './Home.scss'

import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';
import Board from "./Board/Board";

function Home(props) {
    const [sideBar, setSideBar] = useState({
        open: false,
    })

    function handleOpenSideBar() {
        setSideBar({
            open: !sideBar.open
        })
    }
    return (
        <div className='home-container'>
            <NavBar 
            onButtonMenuClick={handleOpenSideBar} />
            <SideBar
            open={sideBar.open}
            onClose={handleOpenSideBar}
            />
            <Board id={6} boardName="untitled"/>
        </div>
    )
}

export default Home

