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
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Employee Profile</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="modal_row_1">
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
                        </div>
                        <div className="modal_row_1">
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
                        </div>
                        <FormGroup>
                            <Label for="color">Color</Label>
                            <div className="modal_row_1">
                                <h5><span className="badge" style={{ backgroundColor: this.state.activeEmp.color }}>{this.state.activeEmp.color}</span></h5>
                                <Button color="secondary" size="sm" onClick={this.handleColorChange}>Generate Color Again</Button>
                            </div>
                        </FormGroup>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="sun-start">Monday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "monday_start")}
                                        defaultValue={moment(this.state.activeEmp.monday_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="monday-end">Monday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "monday_end")}
                                        defaultValue={moment(this.state.activeEmp.monday_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="tuesday-start">Tuesday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "tue_start")}
                                        defaultValue={moment(this.state.activeEmp.tue_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tuesday-end">Tuesday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "tue_end")}
                                        defaultValue={moment(this.state.activeEmp.tue_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="wednesday-start">Wednesday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "wed_start")}
                                        defaultValue={moment(this.state.activeEmp.wed_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="wednesday-end">Wednesday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "wed_end")}
                                        defaultValue={moment(this.state.activeEmp.wed_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="thursday-start">Thursday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "thu_start")}
                                        defaultValue={moment(this.state.activeEmp.thu_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="thursday-end">Thursday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "thu_end")}
                                        defaultValue={moment(this.state.activeEmp.thu_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="friday-start">Friday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "fri_start")}
                                        defaultValue={moment(this.state.activeEmp.fri_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="friday-end">Friday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "fri_end")}
                                        defaultValue={moment(this.state.activeEmp.fri_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="saturday-start">Saturday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sat_start")}
                                        defaultValue={moment(this.state.activeEmp.sat_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="saturday-end">Saturday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sat_end")}
                                        defaultValue={moment(this.state.activeEmp.sat_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="sunday-start">Sunday Start</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sun_start")}
                                        defaultValue={moment(this.state.activeEmp.sun_start, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sunday-end">Sunday End</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sun_end")}
                                        defaultValue={moment(this.state.activeEmp.sun_end, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeEmp)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}