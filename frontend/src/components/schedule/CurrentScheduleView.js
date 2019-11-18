import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Schedule from "./Schedule";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
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
      schedules: {},
      activeTab: "1",
      currentWeek: {
        monday: week[0],
        tue: week[1],
        wed: week[2],
        thu: week[3],
        fri: week[4],
        sat: week[5],
        sun: week[6]
      }
    };
  }

  componentDidMount() {
    this.getLocations();
    this.getEmployees();
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

  isWeekend = (day) => {
    return day === "sat" || day === "sun";
  }

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

  generateSchedule = (loc) => {
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

    return { ...schedule, loc: loc.id };
  };

  saveEmployeeAssignment = empAssign => {
    if (empAssign.id) {
      axios
        .put(`http://localhost:8000/api/employee-assignments/${empAssign.id}/`, empAssign)
        .then(res => console.log("updated employee assignment"));
      return;
    }
    axios
      .post("http://localhost:8000/api/employee-assignments/", empAssign)
      .then(res => console.log("created employee assignment"));
  };

  saveDaySchedule = (day, location, daySchedule) => {
    let formattedDay = this.state.currentWeek[day];
    Object.keys(daySchedule).forEach(time => {
      let empAssign = {
        employee: daySchedule[time],
        location,
        start: formattedDay + " " + time
      };

      this.saveEmployeeAssignment(empAssign);
    });
  }

  saveSchedule = (schedule) => {
    let location = schedule.loc;
    Object.keys(schedule).forEach(day => {
      if (day !== "loc") {
        this.saveDaySchedule(day, location, schedule[day]);
      }
    });
  }

  saveAllSchedules = () => {
    let { schedules } = this.state;
    Object.keys(schedules).forEach(loc => {
      this.saveSchedule(schedules[loc]);
    });
  }

  generateAllSchedules = () => {
    let schedules = this.state.locations.map(loc => {
      return this.generateSchedule(loc);
    });

    this.setState({ schedules });
  };

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
        <h3>{loc.name} </h3>
        <Schedule></Schedule>
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
              <Nav tabs>
                {this.renderTabs()}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {this.renderTabContent()}
              </TabContent>
              <Button color="success" onClick={() => this.generateAllSchedules()}>Generate Schedule</Button>
              <Button disabled={Object.keys(this.state.schedules).length === 0} color="info" 
                      onClick={() => this.saveAllSchedules()}>Save Schedule</Button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default CurrentScheduleView;