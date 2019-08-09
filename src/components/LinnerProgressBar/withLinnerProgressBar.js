import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    progressBar: {
        left: 0,
        top: 0,
        right: 0,
        position: "absolute",
        zIndex: 1120,
    },

});

const withLinnerProgressBar = Component => {
    return function WithProgressBarComponent(props) {
        const classes = useStyles();
        const [state, setState] = useState({
            load : false
        })
        const handleProgressBar = (value) => {
            setState({
                load: value
            })
        }
        return (
            <div className={classes.root}>
                {state.load&&<LinearProgress className={classes.progressBar} />}
                <Component {...props} handleProgressBar={handleProgressBar}/>
            </div>
        )
    }
}
export default withLinnerProgressBar
