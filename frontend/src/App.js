import React, { Component } from "react";
import EmployeeView from "./components/employee/EmployeeView";
import CurrentScheduleView from "./components/schedule/CurrentScheduleView";
import LocationView from "./components/location/LocationView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <EmployeeView />
        <LocationView />
        <CurrentScheduleView />
      </>
    );
  }
}
export default App;