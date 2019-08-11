import React from 'react';
import "./AuthPage.scss"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import * as Thunk from '../../redux/thunk/AuthThunk';
import { AUTH } from '../../redux/Types'
import withLinnerProgressBar from '../../components/LinnerProgressBar/withLinnerProgressBar'

const useStyles = makeStyles({
    grid: {
        height: "100%",
        boxSizing: "border-box",
        minHeight: "100vh",
    }
});

function AuthPage(props) {
    const { Auth, login, handleProgressBar } = props;
    const classes = useStyles();
    if (Auth.status === AUTH.LOGIN_SUCCESS) return <Redirect to='/' />
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
                        <Route path='/auth/login'
                            component={r =>
                                <LoginForm
                                    error={Auth.error}
                                    login={(u, p) => { login(u, p); handleProgressBar(true) }}
                                    onSucess={() => handleProgressBar(false)}
                                />}
                        />
                        <Route path='/auth/signup'
                            component={r =>
                                <SignUpForm
                                    error={Auth.error}
                                    login={(u, p) => { login(u, p); handleProgressBar(true) }}
                                    onSucess={() => handleProgressBar(false)}
                                />}
                        />
                    </Switch>

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
    }, dispatch)
}
export default withLinnerProgressBar(connect(mapStateToProps, mapDispatchToProps)(AuthPage))