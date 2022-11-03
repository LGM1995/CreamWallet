import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Login from './component/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import JoinProc from "./component/JoinProc";

function App() {
    // const [hello, setHello] = useState('')
    //
    // useEffect(() => {
    //     axios.get('/api/test')
    //         .then(response => setHello(response.data))
    //         .catch(error => console.log(error))
    // }, []);
    //
    // return (
    //     <div>
    //         백엔드에서 가져온 데이터입니다 : {hello}
    //     </div>
    // );

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
                </Switch>
            </div>
        </BrowserRouter>
    )

}

export default App;