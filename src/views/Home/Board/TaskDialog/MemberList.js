import React from 'react';
import PropType from 'prop-types'
import { DialogContent, Avatar} from '@material-ui/core';
import {People as IconPeople} from '@material-ui/icons';
import { useStyles } from './TaskDialogStyle'

function MemberList(props) {
    const classes = useStyles();
    const { members, assignee } = props;
    return (
        <DialogContent className={classes.dialogContent}>
            <div className={classes.line}>
                <IconPeople className={classes.icon} />
                Members
        </div>
            <div className={classes.line}>
                {members.map(e => {
                    let index = assignee.findIndex(v => e.id === v.userId )
                    if (index !== -1) return (
                        <div key={e.id} className={classes.memberCard}>
                            <Avatar className={classes.icon}>{e.fullName[0]}</Avatar>
                            <span className={`member-card-name ${classes.memberCardName}`}>{e.fullName}</span>
                        </div>

                    )
                    else return null
                }

                )}
            </div>
        </DialogContent>
    )
}
MemberList.propTypes = {
    members: PropType.array, 
    assignee: PropType.array, 
}
export default MemberList