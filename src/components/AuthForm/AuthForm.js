import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'

import * as color from '../assets/color';

import {login} from '../../redux/thunk/AuthThunk'

const useStyles = makeStyles({
    card: {
        minWidth: 350,
        boxSizing: "border-box",
        background: color.color_bg_transparent
    },
    cardHeader: {
        background: color.color_bg_white90,
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
    const [state, setState] = useState({
        username: "",
        password: "",
    })
    const classes = useStyles();

    var loginHandal = () =>{
        props.
    }

    return (
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
                    onChange={(e)=>setState({
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
                    onChange={(e)=>setState({
                        ...state,
                        password: e.target.value
                    })}
                    />
                <Link 
                    underline='none' 
                    component='button' 
                    color='primary'
                    onClick={()=>{
                        alert('redirect')
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
                    onClick={()=>{
                        
                    }}    
                >
                    <Typography color='secondary'>login</Typography>
                </Button>
            </CardActions>

        </Card>
    )
}
const mapStateToProps = ({ Auth }) => ({
    Auth: Auth
  });

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)