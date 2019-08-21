import React from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuItem, Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
    text: {
        padding: theme.spacing(0.2, 1)
    }
}))

function PopUpMenu(props) {
    const classes = useStyle();
    const { open, fullList, fullListKey, negativeList, negativeListKey,
        anchorRoot, onItemClick, onClose, displayFeild, renderNegativeList,
        avatarList } = props;
    var show = fullList.length - negativeList.length > 0;
    if (renderNegativeList && show === false) show = true;
    if (renderNegativeList && negativeList.length === 0) show = false;
    return (
        <Menu
            open={open && show}
            anchorEl={anchorRoot}
            onClose={onClose}
        >
            {fullList.map(fl => {
                let notInclude = -1 === negativeList.findIndex(nl => {
                    return nl[negativeListKey] === fl[fullListKey]
                })
                if (renderNegativeList) notInclude = !notInclude;
                if (notInclude)
                    return (
                        <MenuItem
                            onClick={event => {
                                if(onItemClick)onItemClick(fl, event);
                            }}
                        >
                            {avatarList&&<Avatar>{fl[displayFeild][0]}</Avatar>}
                            <Typography className={classes.text}>{fl[displayFeild]}</Typography>
                        </MenuItem>
                    )
                else return null
            })}
        </Menu>
    )
}

PopUpMenu.propTypes = {
    open: PropTypes.bool,
    fullList: PropTypes.array,
    fullListKey: PropTypes.string,
    negativeList: PropTypes.array,
    negativeListKey: PropTypes.string,
    displayFeild: PropTypes.string,
    anchorRoot: PropTypes.node,
    onItemClick: PropTypes.func,
    onClose: PropTypes.func,
    renderNegativeList: PropTypes.bool,
    avatarList: PropTypes.bool
}

PopUpMenu.defaultProps = {
    fullList: [],
    fullListKey: '',
    negativeList: [],
    negativeListKey: '',
}
export default PopUpMenu

