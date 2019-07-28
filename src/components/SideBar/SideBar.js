import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import * as color from '../assets/color'

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import IconPerson from '@material-ui/icons/PersonRounded';
import IconHome from '@material-ui/icons/HomeRounded';
import IconChart from '@material-ui/icons/InsertChart';

import back_img from '../../assets/bg_lake.jpg'

const useStyle = makeStyles( theme => ({
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
            backgroundColor: color.color_bg_white30,
        },
        '&.MuiListItem-root.Mui-selected': {
            backgroundColor: color.color_bg_white30,
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

function SideBar(props) {
    const classes = useStyle();
    const { onClose, ...other } = props;
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
                    L
                </Avatar>
                <List>
                    <Divider className={classes.divider} />
                    {/* Home page */}
                    <ListItem
                        button
                        selected
                        className={classes.listItem}
                    >
                        <ListItemIcon>
                            <IconHome
                                className={classes.icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.text}>
                            Dashboard
                    </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                    {/* Profile page */}
                    <ListItem
                        button
                        className={classes.listItem}
                    >
                        <ListItemIcon>
                            <IconPerson
                                className={classes.icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.text}>
                            Profile
                    </ListItemText>
                    </ListItem>
                    <Divider className={classes.divider} />
                    {/* insight page */}
                    <ListItem
                        button
                        className={classes.listItem}
                    >
                        <ListItemIcon>
                            <IconChart
                                className={classes.icon}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.text}>
                            Insight
                    </ListItemText>
                    </ListItem>
                </List>
            </div>

        </Drawer>
    )
}

SideBar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

export default SideBar

