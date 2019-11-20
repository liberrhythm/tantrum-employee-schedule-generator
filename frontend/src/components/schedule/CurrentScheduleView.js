import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Schedule from "./Schedule";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import moment from "moment";
import "./CurrentScheduleView.css";

class CurrentScheduleView extends Component {
  constructor(props) {
    super(props);

    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }

    this.state = {
      employees: [],
      locations: [],
      schedules: [],
      generatedSchedules: [],
      activeTab: "1",
      currentWeek: {
        monday: week[0],
        tue: week[1],
        wed: week[2],
        thu: week[3],
        fri: week[4],
        sat: week[5],
        sun: week[6]
      },
      currEmpAssigns: [],
      currentScheduleExists: false,
      loading: true,
      generatedScheduleExists: false,
      toast: <div></div>
    };
  }

  componentDidMount() {
    this.getLocations();
    this.getEmployees();
    this.getCurrentSchedule();
  }

  getEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then(res => {
        this.setState({ employees: res.data });
      })
      .catch(err => console.log(err));
  };

  getLocations = () => {
    axios
      .get("http://localhost:8000/api/locations/")
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.log(err));
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  generateEmptySchedule = (loc) => {
    let emptySchedule = {
      monday: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}, sun: {}
    };

    Object.keys(emptySchedule).forEach(key => {
      let openTime = loc[key + "_open"];
      let closeTime = loc[key + "_close"];
      let openMoment = moment(openTime, ['HH:mm:ss']);
      let closeMoment = moment(closeTime, ['HH:mm:ss']);
      let dayObj = {};

      for (openMoment; openMoment.isBefore(closeMoment); openMoment.add(0.5, 'hours')) {
        dayObj[openMoment.format('HH:mm:ss')] = -1;
      }

      emptySchedule[key] = dayObj;
    });

    return emptySchedule;
  }

  assignEmployee = (id, start, end, daySchedule) => {
    let startMoment = moment(start, ['HH:mm:ss']);
    let endMoment = moment(end, ['HH:mm:ss']);
    if (startMoment.isSame(endMoment)) return daySchedule;

    Object.keys(daySchedule).forEach(time => {
      let timeMoment = moment(time, ['HH:mm:ss']);
      if (timeMoment.isBetween(startMoment, endMoment, null, '[)') && daySchedule[time] === -1) {
        daySchedule[time] = id;
      }
    });

    return daySchedule;
  };

  generateSchedule = (locId) => {
    let loc = this.state.locations[locId];
    let plocEmps = this.state.employees.filter(emp => emp.ploc.id === loc.id);
    let slocEmps = this.state.employees.filter(emp => emp.sloc.id === loc.id);

    let schedule = this.generateEmptySchedule(loc);

    plocEmps.forEach(plocEmp => {
      // for each time block, assign if employee is free
      schedule.monday = this.assignEmployee(plocEmp.id, plocEmp.monday_start, plocEmp.monday_end, schedule.monday);
      schedule.tue = this.assignEmployee(plocEmp.id, plocEmp.tue_start, plocEmp.tue_end, schedule.tue);
      schedule.wed = this.assignEmployee(plocEmp.id, plocEmp.wed_start, plocEmp.wed_end, schedule.wed);
      schedule.thu = this.assignEmployee(plocEmp.id, plocEmp.thu_start, plocEmp.thu_end, schedule.thu);
      schedule.fri = this.assignEmployee(plocEmp.id, plocEmp.fri_start, plocEmp.fri_end, schedule.fri);
      schedule.sat = this.assignEmployee(plocEmp.id, plocEmp.sat_start, plocEmp.sat_end, schedule.sat);
      schedule.sun = this.assignEmployee(plocEmp.id, plocEmp.sun_start, plocEmp.sun_end, schedule.sun);
    });

    slocEmps.forEach(slocEmp => {
      // for each time block, assign if employee is free
      schedule.monday = this.assignEmployee(slocEmp.id, slocEmp.monday_start, slocEmp.monday_end, schedule.monday);
      schedule.tue = this.assignEmployee(slocEmp.id, slocEmp.tue_start, slocEmp.tue_end, schedule.tue);
      schedule.wed = this.assignEmployee(slocEmp.id, slocEmp.wed_start, slocEmp.wed_end, schedule.wed);
      schedule.thu = this.assignEmployee(slocEmp.id, slocEmp.thu_start, slocEmp.thu_end, schedule.thu);
      schedule.fri = this.assignEmployee(slocEmp.id, slocEmp.fri_start, slocEmp.fri_end, schedule.fri);
      schedule.sat = this.assignEmployee(slocEmp.id, slocEmp.sat_start, slocEmp.sat_end, schedule.sat);
      schedule.sun = this.assignEmployee(slocEmp.id, slocEmp.sun_start, slocEmp.sun_end, schedule.sun);
    });

    let obj = { ...schedule, loc: loc.id };
    let schedules = this.state.generatedSchedules;
    schedules[locId] = obj;

    this.setState({ generatedSchedules: schedules });
    this.renderToast(loc.name, "generated");
  };

  updateEmployeeAssignment = empAssign => {
    if (empAssign.id) {
      axios
        .put(`http://localhost:8000/api/employee-assignments/${empAssign.id}/`, empAssign)
        .then();
      return;
    }
  };

  getDayAssigns = (day, location, daySchedule) => {
    let formattedDay = this.state.currentWeek[day];
    let requests = [];
    Object.keys(daySchedule).forEach(time => {
      if (daySchedule[time] !== -1) {
        let empAssign = {
          employee: daySchedule[time],
          location,
          start: formattedDay + " " + time,
          current: true
        };
        
        requests.push(axios.post("http://localhost:8000/api/employee-assignments/", empAssign).catch(err => console.log(err)));
      }
    });

    return requests;
  }

  saveSchedule = (loc) => {
    this.setState({ loading: true });
    let schedule = this.state.generatedSchedules[loc];
    let location = schedule.loc;
    let requests = [];

    Object.keys(schedule).forEach(day => {
      if (day !== "loc") {
        let newRequests = this.getDayAssigns(day, location, schedule[day])
        requests.push(...newRequests);
      }
    });

    axios.all(requests).then(res => {
      this.setState({ loading: false });
      this.getCurrentSchedule();
      this.renderToast(this.state.locations[loc].name, "saved");
    });
  }

  getCurrentSchedule = () => {
    this.setState({ loading: true });
    axios
      .get("http://localhost:8000/api/current-schedule/")
      .then(res => {
        let allAssigns = res.data;
        let schedules = [];
        this.state.locations.forEach(loc => {
          let filteredAssigns = allAssigns.filter(assign => loc.id === assign.location);
          schedules.push(filteredAssigns);
        });

        this.setState({ 
          schedules,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  toggleToast = () => { this.setState({ toast: <div></div> }) };

  renderToast = (location, action) => {
    let toast = (
      <Toast onClose={() => this.setState({ toast: <div></div> })}>
        <ToastHeader toggle={this.toggleToast} style={{ display: 'flex' }}>
          <strong className="mr-auto">{location}</strong>
        </ToastHeader>
        <ToastBody>Schedule for location {action}</ToastBody>
      </Toast>
    );
    this.setState({ toast });
  }
    
  renderTabs = () => {
    const { locations } = this.state;
    return _.map(locations, (loc, key) => (
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === `${key + 1}`, 'tabs': true })}
          onClick={() => this.toggle(`${key + 1}`)}
        >
          {loc.name}
        </NavLink>
      </NavItem>
    ));
  };

  renderTabContent = () => {
    const { locations } = this.state;
    return _.map(locations, (loc, key) => (
      <TabPane tabId={`${key + 1}`}>
        { this.state.schedules.length === 0 && <h5>Loading Current Schedule...</h5> }
        { this.state.schedules.length > 0 && <Schedule schedule={this.state.schedules[key]} location={this.state.locations[key]} currentWeek={this.state.currentWeek}></Schedule> }
        <Button disabled={(this.state.schedules[loc.id-1] && this.state.schedules[loc.id-1].length > 0) || this.state.loading } 
                color="success" onClick={() => this.generateSchedule(key)}>Generate Schedule</Button>
        <Button color="info" onClick={() => this.saveSchedule(key)}>Save Schedule</Button>
      </TabPane>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">Current Schedule</h1>
        <div className="row">
          <div className="col-md-10 col-sm-12 mx-auto p-0">
            <div className="card p-3">
              {this.state.toast}
              <Nav tabs>
                {this.renderTabs()}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {this.renderTabContent()}
              </TabContent>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default CurrentScheduleView;