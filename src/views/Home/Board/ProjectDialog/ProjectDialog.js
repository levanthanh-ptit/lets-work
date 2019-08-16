import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as color from '../../../../components/assets/color';
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, TextField, IconButton, Typography } from '@material-ui/core'
import { Work as IconWork, CancelOutlined as IconCancel, Description as IconDescription } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    dialog: {
        '& .MuiPaper-root': {
            padding: theme.spacing(3),
        },
    },
    dialogContent: {
        minWidth: theme.spacing(70),
        maxWidth: theme.spacing(70),
        background: color.color_bg_white80,
    },
    title: {
        color: '#42526e'
    },
    line: {
        background: color.color_bg_white80,
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        alignItems: 'center',
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(1),
        color: '#42526e',
        '&:focus-within .cancelButton': {
            visibility: 'visible'
        }
    },
    icon: {
        marginRight: theme.spacing(1),
        color: '#42526e'
    },
    textField: {
        flex: 1,
    },
    cancelButton: {
        visibility: 'hidden'
    }
}))
function ProjectDialog(props) {
    const classes = useStyles();
    const { name, description, onClose, open } = props
    const [project, setProject] = useState({
        name: name,
        description: description
    })

    useEffect(() => {
        setProject({ name, description })
    }, [name, description])
    const contentList = [
        {
            name: 'Project name',
            value: project.name,
            onChange: (e) => setProject({ ...project, name: e.target.value }),
            cancel: () => setProject({ ...project, name }),
            Icon: IconWork,
        },
        {
            name: 'Project description',
            value: project.description,
            onChange: (e) => setProject({ ...project, description: e.target.value }),
            cancel: () => setProject({ ...project, description }),
            Icon: IconDescription
        }
    ]

    const renderContent = ({ name, value, onChange, cancel, Icon }) => (
        <DialogContent className={classes.dialogContent}>
            <div className={classes.line}>
                <Icon className={classes.icon} />{name}
            </div>
            <div className={classes.line}>
                <TextField
                    onChange={onChange}
                    className={classes.textField}
                    value={value}
                />
                <IconButton
                    className={`${classes.cancelButton} cancelButton`}
                    onClick={cancel}
                >
                    <IconCancel />
                </IconButton>
            </div>

        </DialogContent>
    )

    return (
        <Dialog
            className={classes.dialog}
            open={open}
            onClose={() => onClose(project)}>
            <DialogTitle>
                <Typography 
                align='center' className={classes.title}
                color='inherit'
                variant='h5'
                maxWidth
                >{`Edit project`}</Typography>
            </DialogTitle>
            {contentList.map(e => { return renderContent(e) })}
        </Dialog>
    )
}

ProjectDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    name: PropTypes.string,
    description: PropTypes.string,

}

export default ProjectDialog

