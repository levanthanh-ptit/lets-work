import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import AuthPage from './views/Auth/AuthPage';
import Home from './views/Home/Home'


export function App(props) {
  const {token} = props.Auth;
  return (
    <div className="App">
      {token?
        <Home/>:
        <AuthPage/>
      }
      {/* <Home/> */}
    </div>
  )
}

const mapStateToProps = ({ Auth }) => ({
  Auth: Auth
});

export default connect(mapStateToProps, null)(App)

