import React from "react";
import {HashRouter, Route, Switch, Redirect} from './react-router'
import Home from "./Home";
import User from "./User";

function App() {
    return <HashRouter>
       <Switch>
           <Route pathname={'/home'} component={Home} exact={true} />
           <Route pathname={'/user'} component={User} exact={true} />
           <Redirect to={'/home'} />
       </Switch>
    </HashRouter>
}

export default App