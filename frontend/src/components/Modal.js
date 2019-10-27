import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from "moment";
import './Modal.css';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeEmp: this.props.activeEmp
        };
    }

    handleTextChange = e => {
        let { name, value } = e.target;
        const activeEmp = { ...this.state.activeEmp, [name]: value };
        this.setState({ activeEmp });
    };

    handleSelectChange = e => {
        let { name, value } = e.target;
        const activeEmp = { ...this.state.activeEmp, [name]: +value };
        this.setState({ activeEmp });
    };

    handleTimeChange = (value, name) => {
        const activeEmp = { ...this.state.activeEmp, [name]: value.format('HH:mm:ss') };
        this.setState({ activeEmp });
    };

    handleColorChange = () => {
        const activeEmp = { ...this.state.activeEmp, "color": this.generateRandomColor() };
        this.setState({ activeEmp });
    };

    generateRandomColor = () => {
        return '#' + (Math.random()*0xFFFFFF<<0).toString(16);
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Employee Profile</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="first-name">First Name</Label>
                            <Input
                                type="text"
                                name="first_name"
                                value={this.state.activeEmp.first_name}
                                onChange={this.handleTextChange}
                                placeholder="Enter First Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last-name">Last Name</Label>
                            <Input
                                type="text"
                                name="last_name"
                                value={this.state.activeEmp.last_name}
                                onChange={this.handleTextChange}
                                placeholder="Enter Last Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="primary-location">Primary Location</Label>
                            <Input type="select" name="primary_location" id="ploc-select"
                                   value={this.state.activeEmp.primary_location}
                                   onChange={this.handleSelectChange}>
                                {this.props.locations.map((loc, key) => {
                                    return (
                                        <option key={key} value={loc.id}>{loc.name}</option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="secondary-location">Secondary Location</Label>
                            <Input type="select" name="secondary_location" id="sloc-select"
                                   value={this.state.activeEmp.secondary_location}
                                   onChange={this.handleSelectChange}>
                                {this.props.locations.map((loc, key) => {
                                    return (
                                        <option key={key} value={loc.id}>{loc.name}</option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="color">Color</Label>
                            <div className="modal_row">
                                <h5><span className="badge" style={{ backgroundColor: this.state.activeEmp.color }}>{this.state.activeEmp.color}</span></h5>
                                <Button color="secondary" size="sm" onClick={this.handleColorChange}>Generate Color Again</Button>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Label for="monday-start">Monday Start</Label>
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "monday_start")}
                                                defaultValue={moment(this.state.activeEmp.monday_start, ['hh:mm:ss a'])}/>
                                </div>
                                <div className="col-sm-6">
                                    <Label for="monday-end">Monday End</Label>
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "monday_end")}
                                                defaultValue={moment(this.state.activeEmp.monday_end, ['hh:mm:ss a'])}/>
                                </div>
                            </div> 
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeEmp)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}