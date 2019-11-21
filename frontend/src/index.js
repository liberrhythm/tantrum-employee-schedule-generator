import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'     // add this
import App from './App';
import * as serviceWorker from './serviceWorker';
import EmployeeView from "./components/employee/EmployeeView";
import LocationView from "./components/location/LocationView";
import PastSchedulesView from "./components/schedule/PastSchedulesView";
import RequestsView from "./components/requests/RequestsView";
import CalendarView from "./components/calendar/CalendarView";
import LoginError from './components/login/loginError';
import CurrentScheduleViewEmp from './components/employeeView/CurrentScheduleViewEmp';
import CurrentScheduleView from './components/schedule/CurrentScheduleView';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/employeeView" component={CurrentScheduleViewEmp} />
        <Route path="/managerView" component={CurrentScheduleView} />
        <Route path="/employee" component={EmployeeView} />
        <Route path="/location" component={LocationView} />
        <Route path="/requests" component={RequestsView} />
        <Route path="/calendar" component={CalendarView} />
        <Route path="/past-schedules" component={PastSchedulesView} />
        <Route path="/logout" component={App} />
        <Route path="/error" component={LoginError} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
