import { makeStyles } from '@material-ui/core/styles';
import * as color from '../../../components/assets/color';

export const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        flex: 1
    },
    subBar: {
        background: color.color_bg_black40,
        boxShadow: 'none'
    },
    columnWrap: {
        display: 'inline-block',
    },
    column: {
        backgroundColor: color.color_bg_white90,
        height: theme.spacing(20),
        width: theme.spacing(30),
        borderRadius: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}))