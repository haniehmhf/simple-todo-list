import Task from "./task";
import {useContext, useEffect, useState} from "react";
import {fetchTasks} from "../services/api-serivice";
import {GlobalCtx} from "../context/global-context";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const TasksStyle = makeStyles({
    tasks: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div': {
            width: '100%',
            height: 'inherit',
        }
    },
    noResult: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
})

const Tasks = () => {
    const {tasks, setTasks} = useContext(GlobalCtx);
    const [loader, setLoader] = useState(true);
    const style = TasksStyle();

    useEffect(() => {
        fetchAllTasks();
    }, [])

    const fetchAllTasks = () => {
        setLoader(true);
        fetchTasks()
            .then((res) => setTasks(res))
            .catch(console.log)
            .finally(() => setLoader(false))
    };

    const renderTasks = () => {
        if (!!tasks.length)
            return (
                <div>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} fetchTasks={fetchAllTasks}/>
                    ))}
                </div>
            )

        return (
            <div className={style.noResult}>
                <p>There is no Task</p>
                <Link to="/newTask">Add Task</Link>
            </div>
        )
    }

    return (
        <section className={style.tasks}>
            {loader && <CircularProgress disableShrink/>}

            {!loader &&renderTasks()}
        </section>
    );
};

export default Tasks;
