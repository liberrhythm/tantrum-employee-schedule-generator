import React, { Component } from "react";
import _ from "lodash";
// this file should show the employee legend

class Legend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: props.employees
        };
    }

    componentDidMount() {}

    renderEmployeeColorBlocks() {
        let { employees } = this.state;
        return _.map(employees, (emp) => (
            <div style={{ height: '30px', width: '80px', backgroundColor: emp.color, textAlign: 'center', margin: '5px 0px' }}>
                {emp.first_name}
            </div>
        ));
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                {this.renderEmployeeColorBlocks()}
            </div>
        );
    }
}
export default Legend;