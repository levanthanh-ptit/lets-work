import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Typography, TextField, Link, Button } from '@material-ui/core';

import * as color from '../assets/color';

const useStyles = makeStyles(theme => ({
    card: {
        width: theme.spacing(100),
        background: color.color_bg_transparent
    },
    cardHeader: {
        background: color.color_bg_white90,
        textAlign: 'center',
    },
    cardContent: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(1, 1),
        justifyContent: 'space-evenly',
        background: color.color_bg_white80,
    },
    cardAction: {
        background: color.color_bg_white90
    },
    textField: {
        margin: theme.spacing(2, 1),
        width: theme.spacing(40),
        minWidth: theme.spacing(40)
    },
    errorText: {
        marginBottom: theme.spacing(3)
    },
    signUpLink: {
        marginTop: theme.spacing(3)
    }

}));

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

function SignUpForm(props) {
    const { error, login } = props;

    const [state, setState] = useState({
        hasError: false,
        username: { value: '', error: '' },
        firstName: { value: '', error: '' },
        lastName: { value: '', error: '' },
        password: { value: '', error: '' },
        confirmPassword: { value: '', error: '' },
        email: { value: '', error: '' },
    });
    const classes = useStyles();

    const handleVerify = () => {
        let newstate = state;
        newstate = _.mapValues(newstate,v => {
            let i = v;
            if (v.value === '')
                {
                    newstate.hasError = true;
                    i.error = 'Should not be empty'
                }
            return i;
        })
        if (newstate.password.value !== newstate.confirmPassword.value) {
            newstate.hasError = true;
            newstate.confirmPassword.error = 'The two password not match';
        }
        setState(newstate)
    }

    const handleEdit = (feild, value, error) => {
        setState({
            ...state,
            [feild]: {
                ...state[feild],
                value,
                error
            }
        })
    }

    const listTextFeild = [
        {
            type: 'username', label: 'User name', value: state.username.value,
            helperText: state.username.error,
            attribute: {
                onChange: (e) => handleEdit('username', e.target.value),
            }
        },
        {
            type: 'email', label: 'Email', value: state.email.value,
            helperText: state.email.error,
            attribute: {
                onChange: (e) => handleEdit('email', e.target.value)
            }
        },
        {
            type: 'name', label: 'First name', value: state.firstName.value,
            helperText: state.firstName.error,
            attribute: {
                onChange: (e) => handleEdit('firstName', e.target.value)
            }
        },
        {
            type: 'name', label: 'Last name', value: state.lastName.value,
            helperText: state.lastName.error,
            attribute: {
                onChange: (e) => handleEdit('lastName', e.target.value)
            }
        },
        {
            type: 'password', label: 'Password', value: state.password.value,
            helperText: state.password.error,
            attribute: {
                onChange: (e) => handleEdit('password', e.target.value)
            }
        },
        {
            type: 'password', label: 'Confirm password', value: state.confirmPassword.value,
            helperText: state.confirmPassword.error,
            attribute: {
                onChange: (e) => handleEdit('confirmPassword', e.target.value)
            }
        },

    ]

    const renderFeild = ({ type, label, value, helperText, attribute }) => (
        <TextField
            type={type}
            label={label}
            className={classes.textField}
            margin="dense"
            variant="outlined"
            value={value}
            error={!!helperText}
            helperText={helperText}
            {...attribute}
        />
    )

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title="SIGN UP"
                />
                <CardContent
                    className={classes.cardContent}
                >
                    {listTextFeild.map(e => renderFeild(e))}
                </CardContent>
                <CardContent className={classes.cardContent}
                    style={{
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    {error !== null &&
                        <Typography color="error">{error}</Typography>
                    }
                    <Link
                        className={classes.signUpLink}
                        underline='none'
                        component={AdapterLink}
                        to='/auth/login'
                        color='primary'
                    >
                        Already have a account? sign in here
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
                        onClick={() => handleVerify()}
                    >
                        <Typography color='primary'>sign up</Typography>
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

SignUpForm.propTypes = {
    error: PropTypes.string,
    login: PropTypes.func,
    onSucess: PropTypes.func
}

export default SignUpForm