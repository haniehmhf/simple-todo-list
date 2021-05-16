import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useContext, useEffect, useState} from "react";
import {addTask, fetchTasks} from "../services/api-serivice";
import {GlobalCtx} from "../context/global-context";
import {ThemeProvider} from "@material-ui/styles";
import {Button, createMuiTheme} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '10px 12px 20px 12px',
        position: 'relative',
    },
    title: {
        width: '100%',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > div ': {
            width: '100%',
            marginBottom: '5px',
            '& > div': {
                backgroundColor: 'var(--body-bg)',
                '&:hover,&:focus': {
                    backgroundColor: 'var(--body-bg)',
                }
            }
        }
    },
    buttonsGroup: {
        marginTop: '10px',
        '& > button': {
            height: '36px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--color-1)'
        }
    }
}));

const NewTask = () => {
    const {setTasks} = useContext(GlobalCtx);
    const [datetime, setDateTime] = useState("");
    const [newTask, setNewTask] = useState();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const date = new Date().toLocaleDateString("fr-ca");
        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        let current = `${date}T${time}`;
        setDateTime(current);
    }, [])

    const changeInput = (e) => {
        setNewTask(e.target.value);
    };

    const changeDateTime = (e) => {
        setDateTime(e.target.value);
    };

    const addNewTask = () => {
        if (newTask) {
            addTask(newTask, new Date(datetime))
                .then(() => history.push('/'))
                .catch(console.log);
        } else alert("Insert task name");
    };

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>NeW Task</h1>
            <form className={classes.form} noValidate>
                <TextField required label="Task Content"
                           placeholder="Please Insert Your Task"
                           id="filled-basic" variant="filled"
                           onChange={changeInput}/>
                <TextField
                    id="datetime-local"
                    label="Due Date"
                    type="datetime-local"
                    value={datetime}
                    onChange={changeDateTime}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
            </form>
            <div className={classes.buttonsGroup}>
                <Button variant="contained"
                        size="small" startIcon={<AddIcon/>}
                        onClick={addNewTask}
                >
                    Add TAsk
                </Button>
            </div>
        </div>

    );
};

export default NewTask;
