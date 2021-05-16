import Header from "./components/header";
import Tasks from "./components/tasks";
import NewTask from "./components/new-task";
import GlobalCtxProvider from "./context/global-context";
import {createBrowserHistory} from "history";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {authorizeUser} from "./services/auth-service";

const AppStyle = makeStyles({
    content: {
        maxHeight: '300px',
        padding: '0 20px',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: 'var(--color-1)',
        color: 'var(--color-2)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        webkitBoxShadow: '0 10px 6px -6px #777',
        mozBoxShadow: '0 10px 6px -6px #777',
        boxShadow: '0 6px 20px -6px #777',
        height: '300px'
    },
    App: {
        margin: '0 auto',
        maxWidth: '400px',
        overflowX: 'hidden',
    }
})

const history = createBrowserHistory();

function App() {
    const style = AppStyle();
    useEffect(() => {
        authorizeUser()
    }, []);

    return (
        <GlobalCtxProvider>
            <div className={style.App}>
                <Router history={history}>
                    <Header/>
                    <div className={style.content}>
                        <Switch>
                            <Route path="/newTask">
                                <NewTask/>
                            </Route>
                            <Route path="/">
                                <Tasks/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </GlobalCtxProvider>
    );
}

export default App;
