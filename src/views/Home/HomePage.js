import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HomePage.scss'
import { Redirect, Switch, Route } from 'react-router-dom'

import SideBar from './SideBar';
import NavBar from './NavBar';
import Board from "./Board/Board";
import ListBoard from './ListBoard/ListBoard'

function HomePage(props) {
    const {Auth} = props;

    const userId = Auth.id;
    const [sideBar, setSideBar] = useState({
        open: false,
    })

    function handleOpenSideBar() {
        setSideBar({
            open: !sideBar.open
        })
    }

    if (Auth.token === null) {
        return <Redirect to="/" />
    }
    return (
        <div className='home-container'>
            <NavBar
                onButtonMenuClick={handleOpenSideBar} />
            <SideBar
                open={sideBar.open}
                onClose={handleOpenSideBar}
            />
            <Switch>
                <Route
                    exact
                    path='/home'
                    component={route => (<ListBoard {...route} userId={userId} />)}
                />
                <Route
                    path='/home/board/:boardId'
                    component={ route =>(<Board {...route} />)}
                />
            </Switch>
        </div>
    )
}

HomePage.propTypes = {
    Auth: PropTypes.object
}

export default HomePage

