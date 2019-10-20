import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      // activeItem: {
      //   title: "",
      //   description: "",
      //   completed: false
      // },
      employees: [],
      locations: [],
      modal: false
    };
  }

  componentDidMount() {
    this.getEmployees();
    this.getLocations();
  }

  getEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then(res => this.setState({ employees: res.data }))
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
    console.log(employees);
    return employees.map(emp => (
      <li
        key={emp.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {emp.first_name} {emp.last_name}
        </span>
      </li>
    ));
  };

  renderLocations = () => {
    const { locations } = this.state;
    return locations.map(loc => (
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

  // toggle = () => {
  //   this.setState({ modal: !this.state.modal });
  // };

  // handleSubmit = item => {
  //   this.toggle();
  //   if (item.id) {
  //     axios
  //       .put(`http://localhost:8000/api/todos/${item.id}/`, item)
  //       .then(res => this.refreshList());
  //     return;
  //   }
  //   axios
  //     .post("http://localhost:8000/api/todos/", item)
  //     .then(res => this.refreshList());
  // };

  // handleDelete = item => {
  //   axios
  //     .delete(`http://localhost:8000/api/todos/${item.id}`)
  //     .then(res => this.refreshList());
  // };

  // createItem = () => {
  //   const emp = { first_name: "", last_name: "", completed: false };
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  // editItem = item => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderEmployees()}
              </ul>
              <ul className="list-group list-group-flush">
                {this.renderLocations()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;