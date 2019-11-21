import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'     // add this
import App from './App';
import * as serviceWorker from './serviceWorker';
import EmployeeView from "./components/employee/EmployeeView";
import LocationView from "./components/location/LocationView";
<<<<<<< HEAD
import RequestsView from "./components/requests/RequestsView";
import NavBar from "./navbar"
=======
import CalendarView from "./components/calendar/CalendarView";
>>>>>>> 50e66605e7350797d3f98c0db7fcba6cbcfedca5

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/employee" component={EmployeeView} />
        <Route path="/location" component={LocationView} />
<<<<<<< HEAD
        <Route path="/requests" component={RequestsView} />
=======
        <Route path="/calendar" component={CalendarView} />
>>>>>>> 50e66605e7350797d3f98c0db7fcba6cbcfedca5
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
