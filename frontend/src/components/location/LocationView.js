import React, { Component } from "react";
import LocationModal from "./LocationModal";
import axios from "axios";
import _ from "lodash";
import { Button } from "reactstrap";

class LocationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeLoc: {
        name: "",
        mon_open: '08:00:00',
        mon_close: '08:00:00',
        tue_open: '08:00:00',
        tue_close: '08:00:00',
        wed_open: '08:00:00',
        wed_close: '08:00:00',
        thu_open: '08:00:00',
        thu_close: '08:00:00',
        fri_open: '08:00:00',
        fri_close: '08:00:00',
        sat_open: '08:00:00',
        sat_close: '08:00:00',
        sun_open: '08:00:00',
        sun_close: '08:00:00'
        
      },
      locations: [],
      modal: false
    };
  }

  componentDidMount() {
    this.getLocations();
  }

  getLocations = () => {
    axios
      .get("http://localhost:8000/api/locations/")
      .then(res => this.setState({ locations: res.data }))
      .catch(err => console.log(err));
  };

  handleSubmit = loc => {
    this.toggle();
    if (loc.id) {
      axios
        .put(`http://localhost:8000/api/locations/${loc.id}/`, loc)
        .then(res => this.getLocations());
      return;
    }
    axios
      .post("http://localhost:8000/api/locations/", loc)
      .then(res => this.getLocations());
  };

  createLocation = () => {
    const loc = { name: "", 
                  mon_open: '08:00:00', mon_close: '08:00:00',
                  tue_open: '08:00:00', tue_close: '08:00:00',
                  wed_open: '08:00:00', wed_close: '08:00:00',
                  thu_open: '08:00:00',thu_close: '08:00:00',
                  fri_open: '08:00:00', fri_close: '08:00:00',
                  sat_open: '08:00:00', sat_close: '08:00:00',
                  sun_open: '08:00:00', sun_close: '08:00:00'};
    this.setState({ activeLoc: loc, modal: !this.state.modal });
  };

  editLocation = loc => {
    this.setState({ activeLoc: loc, modal: !this.state.modal });
  };

  deleteLocation = loc => {
    axios
      .delete(`http://localhost:8000/api/locations/${loc.id}`)
      .then(res => this.getLocations());
  };

  renderLocations = () => {
    const { locations } = this.state;
    return _.map(locations, loc => (
      <tr key={loc.id}>
        <td>{loc.name}</td>
        <td>{loc.mon_open} {loc.mon_close}</td>
        <td>{loc.tue_open} {loc.tue_close}</td>
        <td>{loc.wed_open} {loc.wed_close}</td>
        <td>{loc.thu_open} {loc.thu_close}</td>
        <td>{loc.fri_open} {loc.fri_close}</td>
        <td>{loc.sat_open} {loc.sat_close}</td>
        <td>{loc.sun_open} {loc.sun_close}</td>
        <td><Button color="info" onClick={() => this.editLocation(loc)}>Edit</Button></td>
        <td><Button color="danger" onClick={() => this.deleteLocation(loc)}>Delete</Button></td>
      </tr>
    ));
  };
  

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">Location Hours of Operations</h1>
        <div className="row">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Location</th>
                    <th scope="col">Monday</th>
                    <th scope="col">Tuesday</th>
                    <th scope="col">Wednesday</th>
                    <th scope="col">Thursday</th>
                    <th scope="col">Friday</th>
                    <th scope="col">Saturday</th>
                    <th scope="col">Sunday</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderLocations()}
                </tbody>
              </table>
              <Button color="success" onClick={() => this.createLocation()}>Create New Location</Button>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <LocationModal
            activeLoc={this.state.activeLoc}
            locations={this.state.locations}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default LocationView;

