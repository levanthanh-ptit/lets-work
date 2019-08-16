import * as color from '../../../../components/assets/color';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        boxSizing: 'border-box',
        color: '#42526e'
    },
    container: {
        flex: 1,
        padding: theme.spacing(3),
        paddingRight: 0,
        borderRight: `1px dashed ${color.color_bg_black10}`,
        boxSizing: 'border-box',
    },
    side: {
        minWidth: theme.spacing(30),
        display: 'block',
        paddingRight: theme.spacing(6),
        padding: theme.spacing(3),
    },
    sideTitle: {
        marginBottom: theme.spacing(3),
    },
    line: {
        background: color.color_bg_white80,
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        alignItems: 'center',
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(1),
        '&:focus-within .cancelButton':{
            visibility: 'visible'
        }
    },
    dialogContent: {
        minWidth: theme.spacing(70),
        maxWidth: theme.spacing(70),
        background: color.color_bg_white80,
    },
    last: {
        paddingBottom: theme.spacing(3),
    },
    icon: {
        marginRight: theme.spacing(1),
        color: '#42526e'
    },
    sideListItem:{
        paddingRight: 0,
        '&:focus-within .cancelButton':{
            visibility: 'visible'
        }
    },
    textField: {
    },
    memberCard: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1),
        border: "1px lightgray solid",
        boxSizing: 'border-box',
        padding: 3,
        margin: theme.spacing(0.5),
        paddingRight: theme.spacing(1),
        borderRadius: theme.spacing(3),
    },
    memberCardName: {
        display: 'flex',
    },
    cancelButton:{
        visibility: 'hidden',
        marginLeft: theme.spacing(0.5)
    }
}))