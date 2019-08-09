import React, { useState } from 'react'
import { connect } from 'react-redux'
import './HomePage.scss'
import { Redirect, Switch, Route } from 'react-router-dom'

import SideBar from './SideBar';
import NavBar from './NavBar';
import Board from "./Board/Board";
import ListBoard from './ListBoard/ListBoard'
import Profile from './Profile/Profile'
function HomePage(props) {
    const {auth, location} = props;
    
    const userId = auth.id;
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
                data={auth}
                location={location}
            />
            <Switch>
                <Route
                    path='/home/board/:boardId'
                    component={ route =>(<Board {...route} />)}
                />
                <Route 
                    path='/home/profile'
                    component={route => (<Profile {...route}/>)}
                />
                <Route
                    path='/home/boards'
                    component={route => (<ListBoard {...route} userId={userId} />)}
                />
            </Switch>
        </div>
    )
}


const mapStateToProps = ({Auth}) => ({
    auth: Auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
