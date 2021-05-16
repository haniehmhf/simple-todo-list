import {Button} from "@material-ui/core";
import {deleteTask, statusChange} from "../services/api-serivice";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {useContext} from "react";
import {GlobalCtx} from "../context/global-context";
import {makeStyles} from "@material-ui/core/styles";

const TaskStyle = makeStyles({
    taskWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 2px',
        borderBottom: '1px solid var(--body-bg)',
        '& > .buttonsGroup': {
            marginTop: 0,
            '& > button:first-child': {
                fontSize: '11px',
                backgroundColor: 'var(--primary-color)',
                color: 'var(--color-1)'
            }
        },
        '&:last-child': {
            borderBottom: '0'
        }
    }
})

const Task = ({task = {}, fetchTasks}) => {
    const {setTasks} = useContext(GlobalCtx);
    const style = TaskStyle();

    const closeTask = (task) => {
        statusChange(task)
            .then(() => fetchTasks())
            .catch(console.log);
    };

    const removeTask = (task) => {
        deleteTask(task)
            .then(() => fetchTasks())
            .catch(console.log);
    };

    return (
        <div className={style.taskWrapper}>
            <span>{task.content}</span>
            <div className="buttonsGroup">
                <Button variant="contained" onClick={() => closeTask(task)} size="small"> Complete </Button>
                <IconButton onClick={() => removeTask(task)} color="secondary" aria-label="add an alarm">
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    );
};

export default Task;
