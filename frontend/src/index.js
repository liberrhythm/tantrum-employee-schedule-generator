import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'     // add this
import App from './App';
import * as serviceWorker from './serviceWorker';
import EmployeeView from "./components/employee/EmployeeView";
import LocationView from "./components/location/LocationView";
import RequestsView from "./components/requests/RequestsView";
import NavBar from "./navbar"

const routing = (
  <Router>
    <NavBar />
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/employee" component={EmployeeView} />
        <Route path="/location" component={LocationView} />
        <Route path="/requests" component={RequestsView} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
