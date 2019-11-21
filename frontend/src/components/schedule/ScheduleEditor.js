import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Toast, ToastHeader, ToastBody } from 'reactstrap';
import moment from "moment";
import "./ScheduleEditor.css";

class ScheduleEditor extends Component {
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
            locSelected: {},
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
            daySelected: "",
            toast: <div></div>,
            times: [],
            closed: [],
            days: ["monday", "tue", "wed", "thu", "fri", "sat", "sun"],
            formattedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            assignsByTime: {}

        };
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

    showTimes = day => {
        let location = this.state.locSelected
        let openTime = location[day + "_open"]
        let closeTime = location[day + "_close"]
        let openNum = this.getScheduleTimestamp(openTime)
        let closeNum = this.getScheduleTimestamp(closeTime)
        let times = []
        console.log(openNum)
        console.log(closeNum)
        for (var timesCounter = 0; openNum < closeNum; timesCounter++) {
            times[timesCounter] = openNum + ":30"
            timesCounter++
            openNum++
            times[timesCounter] = openNum + ":00"
            console.log(openNum)
        }
        return times.map(time => (
            <option>
                {time}
            </option>
        ));

    };

    getScheduleTimestamp = time => {
        //accepts hh:mm format - convert hh:mm to timestamp
        time = time.replace(/ /g, '');
        var timeArray = parseInt(time.split(':'));
        return timeArray;
    };

    showTimesOuter = s => {
        return (
            <FormGroup>
                <Label for="exampleSelectStart">Start Time</Label>
                <Input type="select" name="selectStart" id="exampleSelectStart">
                    {this.showTimes(s)}
                </Input>
                <Label for="exampleSelect">End Times</Label>
                <Input type="select" name="selectEnd" id="exampleSelectEnd">
                    {this.showTimes(s)}
                </Input>
            </FormGroup>
        );
    };
    
    renderLocations = () => {
        let { locations } = this.state
        return locations.map(loc => (
            <Button color="warning" onClick={() => this.changelocSelected(loc)}>{loc["name"]}</Button>
        ))
    };

    changeDaySelected = (dayS) => {
        let daySelected = dayS.toLowerCase()
        this.setState({ daySelected })
    };

    changelocSelected = (loc) => {
        console.log(loc)
        let locSelected = loc
        this.setState({ locSelected })
        console.log(this.state.locSelected)
    };

    renderButtons = () => {
        let { formattedDays } = this.state;
        return formattedDays.map((day, key) => (
            <Button color="success" onClick={() => this.changeDaySelected(day.substr(0, 3))}>{day.substr(0, 3)} {moment(this.state.currentWeek[this.state.days[key]]).format('M/D')}</Button>
        ));
    };

    showEmployees = () => {
        let { employees } = this.state;
        return employees.map(emp => (
            <option value={emp["id"]}>
                {emp["first_name"]} {emp["last_name"]}
            </option>
        ));
    };

    showEmployeesOuter = () => {
        return (
            <FormGroup>
                <Label for="empSelect">Employee</Label>
                <Input type="select" name="empSelect" id="empSelect">
                    {this.showEmployees()}
                </Input>
            </FormGroup>
        );
    };

    changeSchedule = () => {
        var e = document.getElementById("exampleSelectStart");
        var startTime = e.options[e.selectedIndex].text;
        var e = document.getElementById("exampleSelectEnd");
        var endTime = e.options[e.selectedIndex].text;
        var e = document.getElementById("empSelect");
        var employee = e.options[e.selectedIndex].value;
        var day = this.state.daySelected;
        var loc = this.state.locSelected;
        console.log(startTime)
        console.log(endTime)
        console.log(employee)
        console.log(day)
        console.log(loc)
        console.log(this.state.schedules)
        console.log(this.state.employees)
        var startInt = this.getScheduleTimestamp(startTime)
        var endInt = this.getScheduleTimestamp(endTime)
        console.log(startInt)
        console.log(endInt)
        /*
        let arr = this.state.schedules[loc["id"] - 1].filter(assign => time === assign.start.substr(11, 8));
        let empAssign = arr[0];
        empAssign.emp = employee;
        */
    };

    render() {
        return (
            <div>
                {this.state.locations.length > 0 && this.renderLocations()}
                {!_.isEmpty(this.state.locSelected) && <p>{this.state.locSelected["name"]}</p>}
                {!_.isEmpty(this.state.locSelected) && this.renderButtons()}
                {this.state.locations.length > 0 && <p>{this.state.daySelected.toUpperCase()}</p>}
                {this.state.locations.length > 0 && this.state.daySelected === "mon" && this.showTimesOuter("monday")}
                {this.state.locations.length > 0 && this.state.daySelected === "tue" && this.showTimesOuter("tue")}
                {this.state.locations.length > 0 && this.state.daySelected === "wed" && this.showTimesOuter("wed")}
                {this.state.locations.length > 0 && this.state.daySelected === "thu" && this.showTimesOuter("thu")}
                {this.state.locations.length > 0 && this.state.daySelected === "fri" && this.showTimesOuter("fri")}
                {this.state.locations.length > 0 && this.state.daySelected === "sat" && this.showTimesOuter("sat")}
                {this.state.locations.length > 0 && this.state.daySelected === "sun" && this.showTimesOuter("sun")}
                {this.state.locations.length > 0 && this.state.employees.length > 0 && this.showEmployeesOuter()}
                <Button color="success" onClick={() => this.changeSchedule()}>Submit</Button>
            </div>
        );
    }
}
export default ScheduleEditor;