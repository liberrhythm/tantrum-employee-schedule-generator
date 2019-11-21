import React, { Component } from "react";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './login.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import _ from "lodash";

function myFunction() {
  var x, text;

  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  // Get the value of the input field with id="numb"
  x = document.getElementById("numb").value;

  // If x is Not a Number or less than one or greater than 10
  if (!isValidZip.test(x)) {
      text = "Input not valid";
  } else {
      text = "Input OK";
  }
  document.getElementById("demo").innerHTML = text;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        viewCompleted: false,
        activeEmp: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          primary_location: 0,
          secondary_location: 0
        },
      employees: [],
      modal: false,
      email: "",
      password: ""
    };
  }
 

  componentDidMount() {
    this.getEmployees();
  }

  handleTextChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then(res => {
        this.setState({ employees: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Form className ="login-form">
          <br></br>
          <br></br>
          <h1>
              <span className = "font-weight-bold"></span>
          </h1>
          <h2 className = "text-center">Tantrum Sunless Tanning</h2>
          <FormGroup>
              <Label>Email</Label>
              <Input
                                    type="text"
                                    name="email"
                                    value={this.state.activeEmp.email}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter Email"
                                />
               </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
                                    type="text"
                                    name="email"
                                    value={this.state.activeEmp.password}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter Email"
                                />
            </FormGroup>
          <Button className = "btn-lg btn-dark btn-block" type="button" color="success" disabled={!this.state.activeEmp.email || !this.state.activeEmp.password} 
                            onClick={() => onSave(this.state.activeEmp)}>Log In</Button>
          
      </Form>
    );
  }
}
export default Login;