import React from 'react';
import "./AuthPage.scss"
import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';

const useStyles = makeStyles({
    grid: {
        height: "100%",
        boxSizing: "border-box",
        minHeight: "100vh",
    }
});

function AuthPage(props) {
    const classes = useStyles();
    return (
        <div className="auth-container" >
            <Grid
                className={classes.grid}
                container
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <Switch>
                        <Route exact path='/auth/login'
                            component={LoginForm}
                        />
                        <Route exact path='/auth/signup'
                            component={SignUpForm}
                        />
                    </Switch>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default AuthPage