import axios from "axios";
import uuid from "react-uuid";
import {getToken} from "./auth-service";

axios.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${getToken()}`
    return req
})

export const deleteTask = (task) => {
    return axios.delete(`https://api.todoist.com/rest/v1/tasks/${task.id}`);
};

export const statusChange = (task) => {
    const status = task.completed ? "reopen" : "close";
    return axios.post(`https://api.todoist.com/rest/v1/tasks/${task.id}/${status}`, null);
};

export const fetchTasks = () => {
    return new Promise((resolve,reject) => {
        axios.get("https://api.todoist.com/rest/v1/tasks")
            .then(({data = []}) => {
                const tasks = data.filter(tsk => !tsk.section_id);
                resolve(tasks);
            })
            .catch(reject)
    });
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
