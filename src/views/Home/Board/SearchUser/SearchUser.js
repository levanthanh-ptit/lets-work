import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from '../../../../axios/axios'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import * as ProjectThunk from '../../../../redux/thunk/ProjectThunk'
import {
    Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemText, Typography,
    ListItemSecondaryAction, IconButton
} from '@material-ui/core';
import { PersonAdd as IconPersonAdd } from '@material-ui/icons';

function SearchUser(props) {
    const { onAdd, open, onClose } = props;

    const [state, setState] = useState({
        users: [
            // {
            //     id: 3,
            //     userName: "201107275",
            //     fullName: "Hàn Lê Thanh"
            // },
        ]
    })

    const handleSearch = (key) => {
        axios.get(`/user/search?key_word=${key}`)
            .then(res => {
                setState({
                    ...state,
                    users: res.data
                })
            })
    }

    const renderUser = () => (
        <List>
            {state.users.map(v => (
                <ListItem
                    key={v.id}
                    divider
                >
                    <ListItemText   
                        primary={v.userName}
                        secondary={
                            <Typography
                                variant='body2'
                                color='primary'
                            >
                            {v.fullName}
                            </Typography>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            onClick={() => onAdd(v.id, v.fullName)}
                        >
                            <IconPersonAdd />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>

    )
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>
                <TextField
                    placeholder='Find a user...'
                    variant='standard'
                    fullWidth
                    onKeyPress={e => {
                        if(e.key === 'Enter'){
                            handleSearch(e.target.value)
                        }
                    }}
                />
            </DialogTitle>
            <DialogContent>
                {renderUser()}
            </DialogContent>

        </Dialog>
    )
}

SearchUser.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
}


const mapStateToProps = ({ Project, Auth }) => ({
    data: Project,
    auth: Auth
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onAdd: ProjectThunk.addMember
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchUser)