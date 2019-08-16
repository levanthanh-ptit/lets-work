import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import axios from '../../../axios/axios'
import * as color from '../../../components/assets/color';
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, IconButton, Typography} from '@material-ui/core';
import { PersonAdd as IconPersonAdd, EditSharp as IconEditSharp, People as IconPeople } from '@material-ui/icons'

import SearchUser from './SearchUser/SearchUser'
import PopUpMenu from '../../../components/PopUpMenu/PopUpMenu'
import ProjectDialog from './ProjectDialog/ProjectDialog';
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
    const project = useSelector(state => state.Project)

    const [editProject, setEditProject] = useState({
        open: false
    })

    const [searchUserDialog, setSearchUserDialog] = useState({
        open: false
    })
    const [memberMenu, setMemberMenu] = useState({
        anchor: null,
        open: false,
    })

    const [state, setState] = useState({
        name: '',
        description: '',
    })

    useEffect(() => {
        if (project.id) {
            axios.get(`/project/${project.id}`)
                .then(res => {
                    if (res.status === 200) setState({ ...res.data })
                }).catch(error => {
                    if (error)
                        if (error.response)
                            setState({ error: error.response.message })
                })
        }
    }, [project.id])

    const updateProject = (data) => {
        if (project.id)
        if(!_.isEqual(data, state))
            axios.patch(
                `/project/${project.id}`,
                data
            ).then(res => {
                setState({ ...state, ...data })
            })
    }
    return (
        <>
            <AppBar
                className={classes.subBar}
                position='static'
            >
                <Toolbar variant="regular">
                    <IconButton
                        className={classes.btnIcon}
                        onClick={() => setEditProject({ open: true })}
                    >
                        <IconEditSharp />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>{state.name ? state.name : 'Untitled board'}</Typography>
                    <IconButton
                        className={classes.btnIcon}
                        onClick={() => setSearchUserDialog({ ...searchUserDialog, open: true })}
                    >
                        <IconPersonAdd />
                    </IconButton>
                    <IconButton
                        className={classes.btnIcon}
                        onClick={e => setMemberMenu({ anchor: e.currentTarget, open: true })}
                    >
                        <IconPeople />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SearchUser
                open={searchUserDialog.open}
                onClose={() => setSearchUserDialog({ ...searchUserDialog, open: false })}
            />
            <PopUpMenu anchorRoot={memberMenu.anchor} open={memberMenu.open}
                fullList={project.members} fullListKey='id' displayFeild='fullName'
                onClose={() => setMemberMenu({ open: false })}
            />
            <ProjectDialog
                open={editProject.open}
                name={state.name}
                description={state.description}
                onClose={(e) => {
                    updateProject(e)
                    setEditProject({ open: false })
                }
                }
            />
        </>
    )
}

BoardHeader.propTypes = {
    id: PropTypes.number,
}

export default BoardHeader

