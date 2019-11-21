import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Schedule from "./Schedule";
import Legend from "./Legend";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input } from 'reactstrap';
import moment from "moment";
import "./PastSchedulesView.css";
import NavBar from "../navbar/navbar";

class PastSchedulesView extends Component {
    constructor(props) {
        super(props);

        let pastWeeks = [];

        // get week information for last two weeks
        for (let i = 0; i < 3; i++) {
            let numDays = (i+1)*7;
            let week = [];
            for (let i = 1; i <= 7; i++) {
                let curr = new Date();
                let first = curr.getDate() - curr.getDay() + i;
                let day = new Date(curr.setDate(first - numDays)).toISOString().slice(0, 10);
                week.push(day);
            }
            pastWeeks.push(week);
        }

        let pastWeeksObjects = [];
        pastWeeks.forEach((week, i) => {
            let obj = {
                monday: week[0],
                tue: week[1],
                wed: week[2],
                thu: week[3],
                fri: week[4],
                sat: week[5],
                sun: week[6],
                selectedWeek: i+1
            };
            pastWeeksObjects.push(obj);
        });

        this.state = {
            employees: [],
            locations: [],
            schedules: [],
            activeTab: "1",
            pastWeeks,
            pastWeeksObjects,
            loading: true,
            selectedWeek: 1
        };
    }

    componentDidMount() {
        this.getLocations();
        this.getEmployees();
        this.getSchedule(1);
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

    getSchedule = (numWeeksSince) => {
        this.setState({ loading: true, schedules: [] });
        axios
            .get("http://localhost:8000/api/past-schedule/", {
                params: {
                    numWeeksSince
                }
            })
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

    handleSelectChange = e => {
        let { value } = e.target;
        this.setState({ selectedWeek: value });
        this.getSchedule(value);
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
                {this.state.schedules.length === 0 && <h5 style={{ margin: '0.5rem' }}>Loading Schedule...</h5>}
                {this.state.schedules.length > 0 && <Schedule schedule={this.state.schedules[key]} location={this.state.locations[key]} 
                    currentWeek={this.state.pastWeeksObjects[this.state.selectedWeek-1]}></Schedule>}
            </TabPane>
        ));
    };

    render() {
        return (
            <main className="content">
                <NavBar />
                <h1 className="text-center my-4">Past Schedules</h1>
                <div className="row">
                    <div className="col-md-4"></div>
                    <Input className="col-md-4" type="select" name="week" id="week-select"
                        value={this.state.selectedWeek}
                        onChange={this.handleSelectChange} style={{ marginBottom: '1rem' }}>
                        {this.state.pastWeeksObjects.map((weekObj, key) => {
                            let monday = weekObj["monday"];
                            let sunday = weekObj["sun"];
                            return (
                                <option key={key} value={weekObj.selectedWeek}>
                                    Monday {moment(monday).format('M/D')} - Sunday {moment(sunday).format('M/D')}
                                </option>
                            );
                        })}
                    </Input>
                </div>
                <div className="row">
                    <div className="col-md-2 col-sm-2 mx-auto p-0">
                        {this.state.employees.length > 0 && <Legend employees={this.state.employees} />}
                    </div>
                    <div className="col-md-10 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
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
export default PastSchedulesView;