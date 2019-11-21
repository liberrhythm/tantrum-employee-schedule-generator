import React, { Component } from "react";
import Login from "./components/login/login";

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