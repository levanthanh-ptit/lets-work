import React from 'react';
import "./AuthPage.scss"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AuthForm from '../../components/AuthForm/AuthForm';
import * as Thunk from '../../redux/thunk/AuthThunk';
import {AUTH} from '../../redux/Types'

const useStyles = makeStyles({
    grid: {
        height: "100%",
        boxSizing: "border-box",
        minHeight: "100vh",
    }
});

function AuthPage(props) {
    const {Auth, login, logout} = props;
    const classes = useStyles();
    if(Auth.status === AUTH.LOGIN_SUCCESS) return <Redirect to="user"/>
    return (
        <div className = "auth-container">
            <Grid
                className={classes.grid}
                container
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <AuthForm Auth={Auth} login={login} logout={logout} />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({ Auth }) => ({
    Auth: Auth
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login: Thunk.login,
        logout: Thunk.logout
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)