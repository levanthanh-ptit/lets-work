import React from 'react';
import PropTypes from 'prop-types';
import "./AuthPage.scss"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AuthForm from '../../components/AuthForm/AuthForm';
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
        <div className = "auth-container">
            <Grid
                className={classes.grid}
                container
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <AuthForm />
                </Grid>
            </Grid>
        </div>
    )
}

AuthPage.propTypes = {

}

export default AuthPage

