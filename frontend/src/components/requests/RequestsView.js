import React, { Component } from "react";
import RequestsModal from "./RequestsModal";
import axios from "axios";
import _ from "lodash";
import { Button } from "reactstrap";
import moment from "moment";
import NavBar from "../navbar/navbar";

class RequestsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeReq: {
        employee: 0,
        leave_date: new Date(),
        return_date: new Date(),
        status: "Pending"
      },
      employees: [],
      locations: [],
      modal: false
    };
  }

  componentDidMount() {
    this.getLocations();
    this.getEmployees();
    this.getRequests();
  }

  getEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then(res => {
        this.setState({ employees: res.data });
      })
      .catch(err => console.log(err));
  };

  getLocations = () => {
    axios
      .get("http://localhost:8000/api/locations/")
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.log(err));
  };

  
  getRequests = () => {
    axios
      .get("http://localhost:8000/api/requests/")
      .then(res => {
        this.setState({ requests: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };


  renderRequests = () => {
    const { requests } = this.state;
    console.log(requests);
    return _.map(requests, req => (
      <tr key={req.id}>
        <td>{req.emp.first_name} {req.emp.last_name}</td>
        <td>{moment(req.leave_date).format('LL')}</td>
        <td>{moment(req.return_date).format('LL')}</td>
        <td>{req.status}</td>
        <td><Button color="primary" onClick={() => this.approveReq(req)}>Approve</Button></td>
        <td><Button color="warning" onClick={() => this.denyReq(req)}>Deny</Button></td>
        <td><Button color="danger" onClick={() => this.deleteRequest(req)}>Delete</Button></td>
      </tr>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  
  handleSubmit = req => {
    this.toggle();
    if (req.id) {
      axios
        .put(`http://localhost:8000/api/requests/${req.id}/`, req)
        .then(res => this.getRequests());
      return;
    }
    axios
      .post("http://localhost:8000/api/requests/", req)
      .then(res => this.getRequests());
  };
  
  updateRequest = (req) => {
    console.log(req);
    if (req.id) {
      axios
        .put(`http://localhost:8000/api/requests/${req.id}/`, req)
        .then(res => this.getRequests());
      return;
    }
  }

  createRequest = () => {
    const req = { employee: 0, 
                  leave_date: new Date(), return_date: new Date(),
                  status: "Pending"};
    this.setState({ activeReq: req, modal: !this.state.modal });
  };

  approveReq = req => {
    req.status = "Approved";
    this.updateRequest(req);
  };

  denyReq = req => {
    req.status = "Denied";
    this.updateRequest(req);
  };

  editRequest = req => {
    this.setState({ activeReq: req, modal: !this.state.modal });
  };

  deleteRequest = req => {
    axios
      .delete(`http://localhost:8000/api/requests/${req.id}`)
      .then(res => this.getRequests());
  };
  
  render() {
    return (
      <main className="content">
        <NavBar />
        <h1 className="text-center my-4">Requested Days Off</h1>
        <div className="row">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Employee</th>
                    <th scope="col">Leave Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderRequests()}
                </tbody>
              </table>
              <Button color="success" onClick={() => this.createRequest()}>Create New Request</Button>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <RequestsModal
            activeReq={this.state.activeReq}
            toggle={this.toggle}
            onSave={this.handleSubmit}
            employees={this.state.employees}
          />
        ) : null}
      </main>
    );
  }
}
export default RequestsView;