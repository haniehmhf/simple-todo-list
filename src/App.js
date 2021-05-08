import "./App.scss";
import { useEffect, useState } from "react";
import Header from "./components/header";
import Tasks from "./components/tasks";
import NewTask from "./components/new-task";
import { addTask, fetchTasks } from "./components/api-serivice";
import { Button, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#af7eeb'
    }
  },
});
function App() {
  const token = "01ddd97564de72d38036789a32e7970372df6351";
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState();
  const [datetime, setDateTime] = useState("");
  const [formShow, setFormShow] = useState(false);

  useEffect(() => {
    const date = new Date().toLocaleDateString("fr-ca");
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    let current = `${date}T${time}`;
    setDateTime(current);
    fetchAllTasks();
  }, []);

  const fetchAllTasks = () => {
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch(console.log);
  };

  const addNewTask = () => {
    if (!formShow) {
      setFormShow(true);
      return;
    }

    if (newTask) {
      addTask(newTask, new Date(datetime))
        .then(() => {
          setFormShow(false);
          fetchAllTasks();
        })
        .catch(console.log);
    } else alert("Insert task name");
  };

  const changeInput = (e) => {
    setNewTask(e.target.value);
  };

  const changeDateTime = (e) => {
    setDateTime(e.target.value);
  };
  return (
    <div className="App">
      <Header></Header>
      <div className="content">
      {tasks && tasks.length ?
        <>
          {formShow ? (
            <NewTask
              changeInput={changeInput}
              changeDateTime={changeDateTime}
              datetime={datetime}
            ></NewTask>
          ) : (
            <Tasks
              fetchAllTasks={fetchAllTasks}
              allTasks={tasks}
              token={token}
            ></Tasks>
          )}

          <div className="buttons-group">
            <ThemeProvider theme={theme}>
              {formShow && <Button variant="outlined"
                size="small"
                onClick={() => setFormShow(false)}
              >
                Back
              </Button>}
              <Button variant="contained" color="primary"
                size="small" startIcon={<AddIcon />}
                onClick={addNewTask}
              >
                {!formShow ? "New Task" : "Add Task"}
              </Button>
            </ThemeProvider>
          </div>
        </>
        :
        <CircularProgress disableShrink />
      }
       </div>
    </div>
  );
}

export default App;
