import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardActions, Typography, TextField, Link, Button } from '@material-ui/core';

import * as color from '../assets/color';

const useStyles = makeStyles( theme => ({
    card: {
        minWidth: 350,
        boxSizing: "border-box",
        background: color.color_bg_transparent
    },
    cardHeader: {
        background: color.color_bg_white90,
        textAlign: 'center',
    },
    cardContent: {
        display: 'flex',
        flexDirection: "column",
        justifyItems: "center",
        background: color.color_bg_white80
    },
    cardAction: {
        background: color.color_bg_white90
    },
    textField: {
        marginTop: theme.spacing(3),
    },
    errorText:{
        marginBottom: theme.spacing(3)
    },
    signUpLink:{
        marginTop: theme.spacing(3)
    }

}));

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

function LoginForm(props) {
    const { error, login } = props;

    const [state, setState] = useState({
        username: "levanthanh.ptit",
        password: "thanh12345",
    });
    const classes = useStyles();

    function handleLogin() {
        login(state.username, state.password);
    };

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title="SIGN IN"
                />
                <CardContent
                    className={classes.cardContent}
                >
                    <TextField
                        fullWidth
                        type='email'
                        label="User name"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.username}
                        onChange={(e) => setState({
                            ...state,
                            username: e.target.value
                        })}
                    />
                    <TextField
                        fullWidth
                        type='password'
                        label="Password"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.password}
                        onChange={(e) => setState({
                            ...state,
                            password: e.target.value
                        })}
                    />
                    {error !== null &&
                        <Typography color="error">{error}</Typography>
                    }
                    <Link
                        className={classes.signUpLink}
                        underline='none'
                        component={AdapterLink}
                        color='primary'
                        to='/auth/signup'
                    >
                        Not have a account? sign up now
                        </Link>
                </CardContent>
                <CardActions
                    className={classes.cardAction}
                >
                    <Button
                        className={classes.button}
                        fullWidth
                        color='primary'
                        variant="text"
                        onClick={() => handleLogin()}
                    >
                        <Typography color='primary'>login</Typography>
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

LoginForm.propTypes = {
    error: PropTypes.string,
    login: PropTypes.func,
    onSucess: PropTypes.func
}

export default LoginForm

