import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {useHistory, useLocation} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    header: {
        width: '100%',
        height: '40px',
        fontSize: '1rem',
        fontWeight: 700,
        backgroundColor: 'var(--primary-color)',
        color: 'var(--color-1)',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    button: {
        minWidth: '24px',
        padding: '4px 0',
        position: 'absolute',
        right: '10px',
        '& > span': {
            margin: 0,
            marginLeft: 0,
            marginRight: 0,
            display: 'flex',
            justifyContent: 'center',
            '& > span': {
                marginLeft: '0 !important',
                marginRight: 0,
            }
        }
    },
})

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    let {pathname} = useLocation();

    const onRoute = () => {
        if (pathname == '/newTask')
            history.goBack()
        else
            history.push("/newTask")
    }
    return (
        <div className={classes.header}>
            <span> ToDo List </span>
            <IconButton className={classes.button} variant="contained" color="default"
                        size="small" onClick={onRoute}>
                {pathname == '/newTask' ? <ArrowBack/> : <AddIcon/>}
            </IconButton>
        </div>
    )
}
export default Header