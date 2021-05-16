import axios from "axios";
import uuid from "react-uuid";

const mytoken = '01ddd97564de72d38036789a32e7970372df6351';
const token = localStorage.getItem('token') || mytoken;

axios.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export const deleteTask = (task) => {
    return axios.delete(`https://api.todoist.com/rest/v1/tasks/${task.id}`);
};

export const statusChange = (task) => {
    const status = task.completed ? "reopen" : "close";
    return axios.post(
        `https://api.todoist.com/rest/v1/tasks/${task.id}/${status}`, null);
};

export const fetchTasks = () => {
    return axios.get("https://api.todoist.com/rest/v1/tasks");
};

export const addTask = (newTask, datetime) => {
    return axios.post(
        "https://api.todoist.com/rest/v1/tasks",
        {
            content: `${newTask}`,
            due_datetime: datetime,
            due_lang: "en",
            priority: 4,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "X-Request-Id": `${uuid()}`,
            },
        }
    );
};
