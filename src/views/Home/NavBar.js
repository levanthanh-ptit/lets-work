import React from 'react'
import PropTypes from 'prop-types'

import * as color from '../../components/assets/color'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Fade} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    navBarRoot: {
        // flexGrow: 1,
        flexDirection: "row",
        width: '100%',
        // position: "fixed",
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
        color: color.color_bg_white70,
        // fontStyle: 'italic',
        fontWeight: 500,
        cursor: 'pointer',
        textShadow: `1px 2px ${color.color_bg_white20}`,
        "&:hover": {
            color: color.color_bg_white90,
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
        <div className={classes.navBarRoot}>
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

