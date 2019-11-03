import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Schedule from "./Schedule";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import moment from "moment";


class CurrentScheduleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      locations: [],
      schedules: [],
      activeTab: "1"
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
      let openTime = this.isWeekend(key) ? loc.weekend_open : loc.weekday_open;
      let closeTime = this.isWeekend(key) ? loc.weekend_close : loc.weekday_close;
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
          className={classnames({ active: this.state.activeTab === `${key + 1}` })}
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
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default CurrentScheduleView;