import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import MessageDialog from '../MessageDialog/MessageDialog';
import Fade from '@material-ui/core/Fade';

import * as color from '../assets/color';

const useStyles = makeStyles({
    card: {
        minWidth: 350,
        boxSizing: "border-box",
        background: color.color_bg_transparent
    },
    cardHeader: {
        background: color.color_bg_white90,
        textAlign: 'center',
        // borderBottomColor: color.color_bg_blue30,
        // borderBottomWidth: 1,
        // borderBottomStyle: "solid"
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
        marginTop: 20,
        marginBottom: 20,
    }

});

function AuthForm(props) {
    const { Auth, login, logout } = props;

    const [state, setState] = useState({
        username: "",
        password: "",
        authStatus: props.Auth.status,
    });
    const classes = useStyles();

    function handleLogin() {
        login(state.username, state.password);
    };

    const handleMessageDialog = (open) => {
        if (!open) logout()
    }

    if (Auth.status !== state.authStatus)
        setState({
            ...state,
            authStatus: Auth.status
        })

    return (
        <React.Fragment>
            <Fade in>
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
                        <Link
                            underline='none'
                            component='button'
                            color='primary'
                            onClick={() => {
                                alert(props.Auth.token)
                            }}
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
                            <Typography color='secondary'>login</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Fade>
            <MessageDialog
                open={Auth.status != null}
                handleClose={handleMessageDialog}
                title='Sign in message'
            >
                {props.Auth.status}
            </MessageDialog>
        </React.Fragment>
    )
}

AuthForm.propTypes = {
    Auth: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
}

export default AuthForm

