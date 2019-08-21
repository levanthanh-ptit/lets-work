import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../../../axios/axios'
import * as color from '../../../components/assets/color';
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import {
    PersonAdd as IconPersonAdd, EditSharp as IconEditSharp, People as IconPeople,
    DeleteForever as IconDeleteForever
} from '@material-ui/icons'
import { clean } from '../../../redux/actions/ProjectAction'
import SearchUser from './SearchUser/SearchUser'
import PopUpMenu from '../../../components/PopUpMenu/PopUpMenu'
import ProjectDialog from './ProjectDialog/ProjectDialog';
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'
import * as ProjectThunk from '../../../redux/thunk/ProjectThunk'
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
    const { history, handleRemoveMember } = props;
    const project = useSelector(state => state.Project)
    const auth = useSelector(state => state.Auth)
    const dispatch = useDispatch()

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
    const [memberActionOption, setMemberActionOption] = useState({
        member: {
            id: null,
            fullName: '',
            ownership: ''
        },
        anchor: null,
    })
    const [confirmRemove, setConfirmRemove] = useState({
        action: null,
        open: false,
        message: ''
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
            if (!_.isEqual(data, state))
                axios.patch(
                    `/project/${project.id}`,
                    data
                ).then(res => {
                    setState({ ...state, ...data })
                })
    }

    const isOwner = () => {
        let index = project.members.findIndex(v => {
            return auth.id === v.id && v.ownership === 'owner'
        })
        if (index === -1) return false
        else return true
    }

    const handleDeleteProject = () => {
        axios.delete(`/project/${project.id}`)
            .then(res => {
                dispatch(clean())
                history.goBack()
            }).catch(

            )
    }

    const renderMemberActionOption = () => (
        <Menu
            open={Boolean(memberActionOption.anchor)}
            anchorEl={memberActionOption.anchor}
            onClose={() => setMemberActionOption({ anchor: null })}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        >
            <MenuItem
                onClick={() => {
                    setMemberActionOption({ anchor: null })
                    setMemberMenu({open: false})
                    setConfirmRemove({
                        action: () => handleRemoveMember(memberActionOption.member.id),
                        message: `Remove member ${memberActionOption.member.fullName} with role ${memberActionOption.member.ownership}?`,
                        open: true
                    })
                }}
                style={{ color: 'red' }}
            >
                <IconDeleteForever style={{ color: 'red' }} className={classes.icon} />
                Delete
            </MenuItem>
        </Menu>
    )
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
                onItemClick={(member, event) => {                    
                    setMemberActionOption({
                        member: { ...memberActionOption.member, ...member },
                        anchor: event.currentTarget
                    })
                }}
            />
            <ProjectDialog
                open={editProject.open}
                name={state.name}
                description={state.description}
                owner={isOwner()}
                onDelete={handleDeleteProject}
                onClose={(e) => {
                    updateProject(e)
                    setEditProject({ open: false })
                }
                }
            />
            {renderMemberActionOption()}
            <ConfirmBox open={confirmRemove.open}
                message={confirmRemove.message}
                variant='delete'
                action={confirmRemove.action}
                onClose={() => setConfirmRemove({
                    action: null,
                    message: '',
                    open: false
                })}
                actionLabel="Remove"
            />
        </>
    )
}

BoardHeader.propTypes = {
    id: PropTypes.number,
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleRemoveMember: ProjectThunk.removeMember
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(BoardHeader)

