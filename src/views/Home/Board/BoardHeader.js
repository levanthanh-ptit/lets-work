import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as color from '../../../components/assets/color';
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, IconButton, Typography, Avatar } from '@material-ui/core';
import { PersonAdd as IconPersonAdd, EditSharp as IconEditSharp, People as IconPeople } from '@material-ui/icons'

import SearchUser from './SearchUser/SearchUser'
import PopUpMenu from '../../../components/PopUpMenu/PopUpMenu'
const useStyle = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(1)
    },
    btnIcon: {
        marginRight: theme.spacing(1),
        color: color.color_white,
        padding: theme.spacing(1),
        '&:hover': {
            background: color.color_bg_white20,
        }
    },
    title: {
        flex: 1
    },
    subBar: {
        background: color.color_bg_black40,
        boxShadow: 'none'
    },
}))

function BoardHeader(props) {
    const classes = useStyle();
    const { name, members } = props;

    const [searchUserDialog, setSearchUserDialog] = useState({
        open: false
    })
    const [memberMenu, setMemberMenu] = useState({
        anchor: null,
        open: false,
    })
    console.log(members);
    
    return (
        <>
            <AppBar
                className={classes.subBar}
                position='static'
            >
                <Toolbar variant="regular">
                    <IconButton className={classes.btnIcon}>
                        <IconEditSharp />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>{name ? name : 'Untitled board'}</Typography>
                    <IconButton 
                        className={classes.btnIcon}
                        onClick={()=>setSearchUserDialog({...searchUserDialog, open: true})}
                    >
                        <IconPersonAdd />
                    </IconButton>
                    <IconButton 
                        className={classes.btnIcon}
                        onClick={e => setMemberMenu({anchor: e.currentTarget, open: true})}
                    >
                        <IconPeople />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SearchUser 
                open={searchUserDialog.open}
                onClose={ ()=> setSearchUserDialog({...searchUserDialog, open: false})}
            />
            <PopUpMenu anchorRoot={memberMenu.anchor} open={memberMenu.open}
                fullList={members} fullListKey='id' displayFeild='fullName'
                onClose={() => setMemberMenu({open: false})}
            />
        </>
    )
}

BoardHeader.propTypes = {
    members: PropTypes.array,
    name: PropTypes.string
}

export default BoardHeader

