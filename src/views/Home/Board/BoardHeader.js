import React from 'react'
import PropTypes from 'prop-types'
import { useStyle } from './BoardStyle'
import { Toolbar, AppBar, Menu, MenuItem, Typography, Avatar } from '@material-ui/core';

function BoardHeader(props) {
    const classes = useStyle();
    const {name, members} = props;
    return (
        <AppBar
            className={classes.subBar}
            position='static'
        >
            <Toolbar variant="regular">
                <Typography variant='h6' className={classes.title}>{name ? name : 'Untitled board'}</Typography>
                {members.map(e => (
                    <Avatar className={classes.icon}>{e.fullName[0]}</Avatar>
                ))}
            </Toolbar>
        </AppBar>
    )
}

BoardHeader.propTypes = {
    members: PropTypes.array,
    name: PropTypes.string
}

export default BoardHeader

