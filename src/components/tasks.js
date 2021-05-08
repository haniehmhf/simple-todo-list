import Task from "./task";
import styled from 'styled-components';

const TasksStyle = styled.section`
  width: 100%
`
const Tasks = ({ allTasks = [], fetchAllTasks }) => {
  return (
    <TasksStyle>
        <div>
        {allTasks.map((task) => (
          <Task fetchAllTasks={fetchAllTasks} key={task.id} task={task}></Task>
        ))}
      </div>
    </TasksStyle>
  );
};

export default Tasks;
