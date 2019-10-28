import React, { Component } from "react";
import EmployeeModal from "./EmployeeModal";
import axios from "axios";
import _ from "lodash";
import { Button } from "reactstrap";

class EmployeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeEmp: {
        first_name: "",
        last_name: "",
        primary_location: 0,
        secondary_location: 0,
        ploc: {},
        sloc: {}
      },
      employees: [],
      locations: [],
      modal: false
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
        let employees = _.map(res.data, emp => {
          let ploc = _.find(this.state.locations, loc => { return loc.id === emp.primary_location; });
          let sloc = _.find(this.state.locations, loc => { return loc.id === emp.secondary_location; });
          return { ...emp, ploc, sloc };
        });
        this.setState({ employees });
      })
      .catch(err => console.log(err));
  };

  getLocations = () => {
    axios
      .get("http://localhost:8000/api/locations/")
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.log(err));
  };

  renderEmployees = () => {
    const { employees } = this.state;
    return _.map(employees, emp => (
      <tr key={emp.id}>
        <td>{emp.first_name} {emp.last_name}</td>
        <td>{emp.ploc.name}</td>
        <td>{emp.sloc.name}</td>
        <td><h5><span className="badge" style={{ backgroundColor: emp.color }}>{emp.color}</span></h5></td>
        <td><Button color="info" onClick={() => this.editEmployee(emp)}>Edit</Button></td>
        <td><Button color="danger" onClick={() => this.deleteEmployee(emp)}>Delete</Button></td>
      </tr>
    ));
  };

  renderLocations = () => {
    const { locations } = this.state;
    return _.map(locations, loc => (
      <li
        key={loc.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {loc.name}
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = emp => {
    this.toggle();
    if (emp.id) {
      axios
        .put(`http://localhost:8000/api/employees/${emp.id}/`, emp)
        .then(res => this.getEmployees());
      return;
    }
    axios
      .post("http://localhost:8000/api/employees/", emp)
      .then(res => this.getEmployees());
  };

  createEmployee = () => {
    const emp = { first_name: "", last_name: "", primary_location: 1, secondary_location: 1, color: "#000000",
                  monday_start: "00:00:00", monday_end: "00:00:00", tue_start: "00:00:00", tue_end: "00:00:00",
                  wed_start: "00:00:00", wed_end: "00:00:00", thu_start: "00:00:00", thu_end: "00:00:00",
                  fri_start: "00:00:00", fri_end: "00:00:00", sat_start: "00:00:00", sat_end: "00:00:00",
                  sun_start: "00:00:00", sun_end: "00:00:00" };
    this.setState({ activeEmp: emp, modal: !this.state.modal });
  };

  editEmployee = emp => {
    this.setState({ activeEmp: emp, modal: !this.state.modal });
  };

  deleteEmployee = emp => {
    axios
      .delete(`http://localhost:8000/api/employees/${emp.id}`)
      .then(res => this.getEmployees());
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">Tantrum Sunless Tanning Scheduler</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Primary Location</th>
                    <th scope="col">Secondary Location</th>
                    <th scope="col">Color</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderEmployees()}
                </tbody>
              </table>
              <Button color="success" onClick={() => this.createEmployee()}>Create New Employee</Button>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <EmployeeModal
            activeEmp={this.state.activeEmp}
            locations={this.state.locations}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default EmployeeView;