import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import * as color from '../../../components/assets/color'
import './Profile.scss'
import { Paper, Typography, List, ListItem, ListItemIcon, TextField, IconButton } from '@material-ui/core'
import {
    AccountCircle as IconAccountCircle, Label as IconLabel, Email as IconEmail,
    Work as IconWork, Book as IconBook, MyLocation as IconMyLocation,
    Edit as IconEdit, Save as IconSave
} from '@material-ui/icons'
import withLinnerProgressBar from '../../../components/LinnerProgressBar/withLinnerProgressBar';
import * as AuthThunk from '../../../redux/thunk/AuthThunk'

const useStyle = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4, 5),
        minWidth: theme.spacing(80),
        maxWidth: theme.spacing(80),
        boxSizing: 'content-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    list: {
    },
    listItem: {
        alignItems: 'center',
        padding: theme.spacing(4, 0),
        boxSizing: 'border-box'
    },
    textFeild: {
        boxSizing: 'border-box',
        '& .MuiInput-input': {
            fontSize: "1rem",
            lineHeight: "1.2rem",
            color: color.color_bg_black80,
        },
    }
}))

const profileLayout = [
    { type: 'static', name: 'User name', feild: 'userName', icon: IconAccountCircle },
    { type: 'editable', name: 'First name', feild: 'firstName', icon: IconLabel },
    { type: 'editable', name: 'Last name', feild: 'lastName', icon: IconLabel },
    { type: 'editable', name: 'Email', feild: 'email', icon: IconEmail },
    { type: 'editable', name: 'Company', feild: 'company', icon: IconWork },
    { type: 'editable', name: 'Bio', feild: 'bio', icon: IconBook, attribute: {multiline: true} },
    { type: 'editable', name: 'Country', feild: 'country', icon: IconMyLocation },
]


function Profile(props) {
    const classes = useStyle();
    const { auth, handleProgressBar, handleUpdateProfile } = props;
    const { id, userName, firstName, lastName, email, company, bio, country } = auth;

    const [editMode, setEditMode] = useState(false)

    const [profile, setProfile] = useState({
        id: { value: id, error: '' },
        userName: { value: _.isNull(userName) ? '' : userName, error: '' },
        firstName: { value: _.isNull(firstName) ? '' : firstName, error: '' },
        lastName: { value: _.isNull(lastName) ? '' : lastName, error: '' },
        email: { value: _.isNull(email) ? '' : email, error: '' },
        company: { value: _.isNull(company) ? '' : company, error: '' },
        bio: { value: _.isNull(bio) ? '' : bio, error: '' },
        country: { value: _.isNull(country) ? '' : country, error: '' }
    })

    const handleEditProfile = (feild, value) => {
        setProfile({
            ...profile,
            [feild]: { ...profile[feild], value }
        })
    }

    const _handlePreUpload = async () => {
        let arr = await _.mapValues(profile, e => {
                return e.value
        })
        await handleUpdateProfile(id, arr) 
    }

    const handleEditMode = async (status) => {
        if (status === true)
            setEditMode(true)
        else {
            setEditMode(false)
            await handleProgressBar(true)
            await _handlePreUpload()
            await handleProgressBar(false)
        }
    }

    const renderStaticFeild = (name, feild, FeildIcon, index) => (
        <ListItem divider className={classes.listItem} key={index}>
            <ListItemIcon>
                <FeildIcon fontSize='large' color='primary' />
            </ListItemIcon>
            <div className='profile-line'>
                <Typography variant='caption'>{name}</Typography>
                <Typography variant='h5'>{profile[feild].value}</Typography>
            </div>
        </ListItem>
    )

    const renderEditableField = (name, feild, FeildIcon, attribute, index) => {
        return (
            <ListItem divider className={classes.listItem} key={index}>
                <ListItemIcon>
                    <FeildIcon fontSize='large' color={editMode ? 'primary' : 'default'} />
                </ListItemIcon>
                <TextField
                    disabled={!editMode}
                    className={classes.textFeild}
                    label={name}
                    error={!!profile[feild].error}
                    helperText={profile[feild].error}
                    fullWidth
                    {...attribute}
                    value={profile[feild].value}
                    onChange={e => handleEditProfile(feild, e.target.value)}
                />
            </ListItem>
        )
    }

    const renderActionButton = () => (
        <div className='profile-action-list'>
            <IconButton className='profile-edit-button'
                onClick={() => handleEditMode(!editMode)}
            >
                <IconEdit
                    className='profile-edit-button_icon'
                    style={{ opacity: editMode ? 0 : 1 }}
                    fontSize='large' color='primary' />
                <IconSave
                    className='profile-edit-button_icon'
                    style={{ position: 'absolute', opacity: editMode ? 1 : 0 }}
                    fontSize='large' color='primary' />
            </IconButton>
        </div>

    )

    return (
        <div className={`profile`}>
            <Paper
                className={classes.paper}
            >
                <List className={classes.list}>
                    {profileLayout.map((e, i) => {
                        if (e.type === 'static') return renderStaticFeild(e.name, e.feild, e.icon, i)
                        if (e.type === 'editable') return renderEditableField(e.name, e.feild, e.icon, e.attribute, i)
                    })}
                </List>
                {renderActionButton()}
            </Paper>
        </div >
    )
}
const mapStateToProps = ({ Auth }) => ({
    auth: Auth
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleUpdateProfile: AuthThunk.uploadProfile
    }, dispatch)
}

export default withLinnerProgressBar(connect(mapStateToProps, mapDispatchToProps)(Profile))
