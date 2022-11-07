import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './component/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import JoinProc from "./component/JoinProc";
import Main from "./component/Main";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route path="/joinproc">
                        <JoinProc/>
                    </Route>
                    <Route path="/main">
                        <Main/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )

}

export default App;