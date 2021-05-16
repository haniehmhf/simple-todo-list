import React, {createContext, useState} from "react";

export const GlobalCtx = createContext({})
const GlobalCtxProvider = ({children}) => {
    const [tasks,setTasks] = useState([]);

    const state = {
        tasks,
        setTasks,
    }

    return <GlobalCtx.Provider value={state}>{children}</GlobalCtx.Provider>;
}
export default GlobalCtxProvider;