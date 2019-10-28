import React, { Component } from "react";
import EmployeeView from "./components/employee/EmployeeView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <EmployeeView />
    );
  }
}
export default App;