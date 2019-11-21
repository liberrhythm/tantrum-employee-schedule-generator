import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";
import ScheduleEditorModal from "./ScheduleEditorModal";
import axios from "axios";

// this file should define how a Schedule component should be rendered

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: props.schedule,
            location: props.location,
            currentWeek: props.currentWeek,
            times: [],
            closed: [],
            days: ["monday", "tue", "wed", "thu", "fri", "sat", "sun"],
            formattedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            assignsByTime: {},
            modal: false,
            activeEmpAssign: {}
        };
    }

    componentDidMount() { 
        this.generateTimes();
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    editEmployeeAssignment = empAssign => {
        if (empAssign) this.setState({ activeEmpAssign: empAssign, modal: !this.state.modal });
    };

    handleSubmit = empAssign => {
        this.toggle();
        if (empAssign.id) {
          axios
            .put(`http://localhost:8000/api/employee-assignments/${empAssign.id}/`, empAssign)
            .then(res => {
                let newAssign = res.data;
                let { assignsByTime } = this.state;
                let timeKey = empAssign.start.substr(11, 8);
                let timeArr = assignsByTime[timeKey];
                let newArr = [];
                timeArr.forEach(assign => {
                    if(assign != null)
                        if (assign.start === newAssign.start) newArr.push(newAssign);
                    else newArr.push(assign);
                })
                this.setState({ assignsByTime: {...assignsByTime, [timeKey]: newArr } });
            });
            return;
        }
    };

    generateTimes = () => {
        let times = [];

        let earliestOpenTime = moment('23:59:59', ['HH:mm:ss']);
        let latestCloseTime = moment('12:00:00', ['HH:mm:ss']);
    
        this.state.days.forEach(day => {
          let openTime = this.state.location[day + "_open"];
          let closeTime = this.state.location[day + "_close"];
          let openMoment = moment(openTime, ['HH:mm:ss']);
          let closeMoment = moment(closeTime, ['HH:mm:ss']);

          if (openMoment.isSame(closeMoment)) {
              this.state.closed.push(true);
          }
          else {
              this.state.closed.push(false);

              if (openMoment.isBefore(earliestOpenTime)) earliestOpenTime = openMoment;
              if (closeMoment.isAfter(latestCloseTime)) latestCloseTime = closeMoment;
          }
        });

        // latestCloseTime.add(0.5, 'hours');

        for (earliestOpenTime; earliestOpenTime.isBefore(latestCloseTime); earliestOpenTime.add(0.5, 'hours')) {
            times.push(earliestOpenTime.format('HH:mm:ss'));
        }

        this.setState({ times });
        this.filterByTime(times);
    }

    filterByTime(times) {
        let { schedule } = this.state;
        let assignsByTime = {};
        times.forEach(time => {
            let timeArr = schedule.filter(assign => time === assign.start.substr(11, 8));
            if (timeArr.length !== 7) {
                let newTimeArr = [];
                let i = 0, j = 0;
                while (i !== 7) {
                    let currDay = this.state.currentWeek[this.state.days[i]];
                    if (j === timeArr.length) {
                        newTimeArr.push(null);
                        i++;
                        continue;
                    }

                    let currAssign = timeArr[j];
                    let currAssignDay = timeArr[j].start.substring(0, 10);
                    if (currDay === currAssignDay) {
                        newTimeArr.push(currAssign);
                        i++; j++;
                    }
                    else {
                        newTimeArr.push(null);
                        i++;
                    }
                }
                assignsByTime[time] = newTimeArr;
            }
            else assignsByTime[time] = timeArr;
        })
        this.setState({ assignsByTime });
    }

    renderTableHeader() {
        let { formattedDays } = this.state;
        return formattedDays.map((day, key) => (
            <th scope="col">{day.substr(0, 3)} {moment(this.state.currentWeek[this.state.days[key]]).format('M/D')}</th>
        ));
    }

    renderTableData(timeArr) {
        return timeArr.map(assign => (
            <td onClick={() => this.editEmployeeAssignment(assign)} style={{ backgroundColor: assign ? assign.emp.color : '#ffffff' }}>
                {assign ? assign.emp.first_name : ''}
            </td>
        ));
    }

    renderTableRows() {
        let { assignsByTime } = this.state;
        if (_.isEmpty(assignsByTime)) return;
        return _.map(assignsByTime, (timeArr, key) => (
            <tr>
                <th scope="row">{moment(key, ['HH:mm:ss']).format('LT')}</th>
                {this.renderTableData(timeArr)}
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <table className="table table-bordered" style={{ margin: '1rem 0rem' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Time</th>
                            {this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableRows()}
                    </tbody>
                </table>
                {this.state.modal ? (
                    <ScheduleEditorModal
                        activeEmpAssign={this.state.activeEmpAssign}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </div>
        );
    }
}
export default Schedule;