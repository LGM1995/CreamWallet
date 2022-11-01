import './App.css';
import Hello from "./component/Hello";
import Welcome from "./component/Welcome";
import PageNotFound from "./component/PageNotFound";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App1() {
    return (
        <BrowserRouter>
            <div className="App1">
                {/*<Header />*/}
                <Switch>
                    <Route exact path="/">
                        <Hello/>
                    </Route>
                    {/*<Hello/>*/}
                    {/*  <Welcome name={"KIM"}/> /!* 인자를 넘겨 줄 수 있고 각 컴포넌트는 따로 관리한다.*!/*/}
                    {/*<Welcome name={"LEE"}/>*/}
                    <Route path="/welcome">
                        <Welcome name={"KIM"}/>
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App1;
