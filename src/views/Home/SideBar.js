import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import * as color from '../../components/assets/color';
import {Link} from 'react-router-dom'

import { Avatar, List, Divider, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import { Person as IconPerson, Home as IconHome } from '@material-ui/icons';
import back_img from '../../assets/bg_lake.jpg'

const useStyle = makeStyles(theme => ({
    drawerContainer: {
        "& .MuiPaper-root": {
            // background: color.color_bg_black90,
            backgroundImage: `url('${back_img}')`,
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundBlendMode: 'darken',
        },

    },
    drawerChild: {
        minWidth: 250,
        color: 'white',
    },
    avatar: {
        margin: 'auto',
        marginTop: 40,
        marginBottom: 20,
        height: 60,
        width: 60,
    },
    listItem: {
        '&:hover': {
            backgroundColor: color.color_bg_white40,
        },
        '&.MuiListItem-root.Mui-selected': {
            backgroundColor: color.color_bg_white40,
        },
    },
    icon: {
        color: color.color_bg_white90,
    },
    divider: {
        background: color.color_bg_white10,
    },
    text: {
        color: color.color_bg_white80,
        textShadow: `1px 1px ${color.color_bg_black30}`,
    }
}))

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

function SideBar(props) {
    const classes = useStyle();
    const { onClose, data, location, ...other } = props;
    const partName = location.pathname;
    
    return (
        <Drawer
            className={classes.drawerContainer}
            {...other}
            onBackdropClick={() => onClose()}
        >
            <div
                className={classes.drawerChild}
            >
                <Avatar
                    className={classes.avatar}
                    alt="avatar"
                >
                    {data.firstName[0]}
                </Avatar>
                <List>
                    <Divider className={classes.divider} />
                    {/* Home page */}
                    <ListItem 
                        button
                        selected={_.startsWith(partName,'/home/board')}
                        className={classes.listItem}
                        component={(!_.startsWith(partName,'/home/board'))?AdapterLink:null}
                        to='/home/boards'
                        onClick={e => {
                            if(_.startsWith(partName,'/home/board')) return
                            onClose()
                        }}
                    >
                        <ListItemIcon>
                            <IconHome className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText className={classes.text}>
                            Dashboard
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                    {/* Profile page */}
                    <ListItem 
                        button
                        selected={_.startsWith(partName,'/home/profile')}
                        className={classes.listItem}
                        component={(!_.startsWith(partName,'/home/profile'))?AdapterLink:null}
                        to='/home/profile'
                        onClick={e => {
                            if(_.startsWith(partName,'/home/profile')) return
                            onClose()
                        }}
                    >
                        <ListItemIcon>
                            <IconPerson className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText className={classes.text}>
                            Profile
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                </List>
            </div>

        </Drawer>
    )
}

SideBar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    data: PropTypes.object,
    location: PropTypes.object
}

export default SideBar

