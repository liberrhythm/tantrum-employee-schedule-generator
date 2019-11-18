import React, { Component } from "react";
import CurrentScheduleView from "./components/schedule/CurrentScheduleView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <CurrentScheduleView />
      </>
    );
  }
}
export default App;