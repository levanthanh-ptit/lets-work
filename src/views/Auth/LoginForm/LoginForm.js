import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Typography, TextField, Link, Button } from '@material-ui/core';
import * as color from '../../../components/assets/color';
import * as Thunk from '../../../redux/thunk/AuthThunk';
import { AUTH } from '../../../redux/Types'
import withLinnerProgressBar from '../../../components/LinnerProgressBar/withLinnerProgressBar'
import MessageDialog from '../../../components/MessageDialog/MessageDialog'
const useStyles = makeStyles(theme => ({
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
    errorText: {
        marginBottom: theme.spacing(3)
    },
    signUpLink: {
        marginTop: theme.spacing(3)
    }

}));

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

function LoginForm(props) {
    const { auth, clearStatus, login, handleProgressBar } = props;

    const [state, setState] = useState({
        username: '',
        password: '',
    });
    const classes = useStyles();

    const handleLogin = () => {
        login(state.username, state.password);
    };
    if(auth.status === AUTH.LOGIN_START) handleProgressBar(true) 
    else handleProgressBar(false)
    if(auth.status === AUTH.LOGIN_SUCCESS ) return <Redirect to='/' />
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
            <MessageDialog
                error
                title={auth.error}
                open={auth.status===AUTH.LOGIN_FAIL}
                onClose={() => clearStatus()}
            />
        </React.Fragment>
    )
}

LoginForm.propTypes = {
    error: PropTypes.string,
    login: PropTypes.func,
    onSucess: PropTypes.func
}
const mapStateToProps = ({ Auth }) => ({
    auth: Auth
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login: Thunk.login,
        clearStatus: Thunk.clearStatus
    }, dispatch)
}
export default withLinnerProgressBar(connect(mapStateToProps, mapDispatchToProps)(LoginForm))

