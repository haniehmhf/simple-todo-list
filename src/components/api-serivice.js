import axios from "axios";
import uuid from "react-uuid";

const token = "01ddd97564de72d38036789a32e7970372df6351";

export const deletTask = (task) => {
  return axios.delete(`https://api.todoist.com/rest/v1/tasks/${task.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const statusChange = (task) => {
  const status = task.completed ? "reopen" : "close";
  return axios.post(
    `https://api.todoist.com/rest/v1/tasks/${task.id}/${status}`, null ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchTasks = () => {
  return axios.get("https://api.todoist.com/rest/v1/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addTask = (newTask,datetime) => {
  return axios.post(
    "https://api.todoist.com/rest/v1/tasks",
    {
      content: `${newTask}`,
      due_datetime : datetime,
      due_lang: "en",
      priority: 4,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Request-Id": `${uuid()}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
