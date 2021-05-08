import { Button } from "@material-ui/core";
import { deletTask, statusChange } from "./api-serivice";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';


const Task = ({ task = {}, fetchAllTasks }) => {
  if (!task || !!task.section_id) return null;

  const closeTask = (task) => {
    statusChange(task)
      .then(() => fetchAllTasks())
      .catch(console.log);
  };

  const removeTask = (task) => {
    deletTask(task)
      .then(() => fetchAllTasks())
      .catch(console.log);
  };

  return (
    <div className="task-wrapper">
        <span>{task.content}</span>
        <div className="buttons-group">
          <Button variant="contained" onClick={() => closeTask(task)} size="small" color="primary"> Complete </Button>
          <IconButton onClick={() => removeTask(task)} color="secondary" aria-label="add an alarm">
            <DeleteIcon />
          </IconButton>
        </div>
    </div>
  );
};

export default Task;
