import React, { Component } from "react";
import EmployeeView from "./components/employee/EmployeeView";
import CurrentScheduleView from "./components/schedule/CurrentScheduleView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <EmployeeView />
        <CurrentScheduleView />
      </>
    );
  }
}
export default App;