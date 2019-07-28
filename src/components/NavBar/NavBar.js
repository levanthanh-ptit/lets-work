import React from 'react'
import PropTypes from 'prop-types'

import * as color from '../assets/color'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        flexDirection: "row",
        width: '100%',
        position: "fixed",
    },
    appBar: {
        background: color.color_bg_black60,
        boxShadow: 'none'
    },
    toolBar: {
        boxSizing: 'border-box',
    },
    menuBtn: {
        marginLeft: theme.spacing(1),
        padding: theme.spacing(1),
        color: color.color_bg_white90,
        '&:hover': {
            background: color.color_bg_white20,
        }
    },
    titleWrap: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',

    },
    title: {
        color: color.color_bg_white60,
        // fontStyle: 'italic',
        fontWeight: 500,
        cursor: 'pointer',
        textShadow: `1px 2px ${color.color_bg_white20}`,
        "&:hover": {
            color: color.color_bg_white80,
        }
    },
    breadcrumbs: {
        color: color.color_bg_white70,
        height: '100%',
        display: 'flex',

    }
}));

function NavBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fade in>
                <AppBar
                    className={classes.appBar}
                    position="static">
                    <Toolbar
                        className={classes.toolBar}
                        disableGutters
                        variant='dense'>
                        <IconButton
                            className={classes.menuBtn}
                            edge="start"
                            centerRipple
                            onClick={() => props.onButtonMenuClick()}
                            aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <div
                            className={classes.titleWrap}
                        >
                            <Typography
                                className={classes.title}
                                variant="h6"
                                color="inherit"
                                noWrap
                                align="center"
                            >
                                Let's Work
                    </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </Fade>
        </div>
    )
}

NavBar.propTypes = {
    onButtonMenuClick: PropTypes.func
}

export default NavBar

