import React, { Component } from "react";
<<<<<<< HEAD
import CurrentScheduleView from "./components/schedule/CurrentScheduleView";
import RequestsView from "./components/requests/RequestsView";
=======
import Login from "./components/login/login";
>>>>>>> 50e66605e7350797d3f98c0db7fcba6cbcfedca5

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Login />
      </>
    );
  }
}
export default App;