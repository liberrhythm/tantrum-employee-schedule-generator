import React, { Component } from "react";
// this file should define how a Schedule component should be rendered

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Monday</th>
                        <th scope="col">Tuesday</th>
                        <th scope="col">Wednesday</th>
                        <th scope="col">Thursday</th>
                        <th scope="col">Friday</th>
                        <th scope="col">Saturday</th>
                        <th scope="col">Sunday</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        );
    }
}
export default Schedule;