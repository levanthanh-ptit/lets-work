import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HomePage.scss'
import {Redirect} from 'react-router-dom'

import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';
import Board from "./Board/Board";

function HomePage(props) {
    const {Auth} = props;
    const [sideBar, setSideBar] = useState({
        open: false,
    })

    function handleOpenSideBar() {
        setSideBar({
            open: !sideBar.open
        })
    }
    console.log(Auth);
    
    if(Auth.token === null ) return <Redirect  to="/"/>
    return (
        <div className='home-container'>
            <NavBar 
            onButtonMenuClick={handleOpenSideBar} />
            <SideBar
            open={sideBar.open}
            onClose={handleOpenSideBar}
            />
            <Board id={6} boardName="untitled" />
        </div>
    )
}

HomePage.propTypes = {
    Auth: PropTypes.object
}

export default HomePage

