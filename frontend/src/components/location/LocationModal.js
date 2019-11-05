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
import './LocationModal.css';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLoc: this.props.activeLoc
        };
    }

    handleTextChange = e => {
        let { name, value } = e.target;
        const activeLoc = { ...this.state.activeLoc, [name]: value };
        this.setState({ activeLoc });
    };

    handleSelectChange = e => {
        let { name, value } = e.target;
        const activeLoc = { ...this.state.activeLoc, [name]: +value };
        this.setState({ activeLoc });
    };

    handleTimeChange = (value, name) => {
        const activeLoc = { ...this.state.activeLoc, [name]: value.format('HH:mm:ss') };
        this.setState({ activeLoc });
    };

    closeLocation = value => {

    };
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Location Profile</ModalHeader>
                <ModalBody>
                    <Form><div className="modal_row_1">
                        <FormGroup>
                            <Label for="location_name">Location</Label>
                            <Input
                                type="text"
                                name="name"
                                value={this.state.activeLoc.name}
                                onChange={this.handleTextChange}
                                placeholder="Enter Location Name"
                            />
                        </FormGroup>
                        </div>
                    <div className="modal_row_2">
                        <FormGroup>
                            <Label for="mon_open">Monday Open</Label>
                            <div className="timepicker">
                                <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "mon_open")}
                                    defaultValue={moment(this.state.activeLoc.mon_open, ['hh:mm:ss a'])} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="mon_close">Monday Close</Label>
                            <div className="timepicker">
                                <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "mon_close")}
                                    defaultValue={moment(this.state.activeLoc.mon_close, ['hh:mm:ss a'])} />
                                </div>
                             </FormGroup>
                        <FormGroup>
                            <Button color="danger" onClick={() => this.closeLocation('mon')}>Closed</Button>
                             </FormGroup>
                             </div>
                        <div className="modal_row_2">
                            <FormGroup>
                                <Label for="tue_open">Tuesday Open</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "tue_open")}
                                        defaultValue={moment(this.state.activeLoc.tue_open, ['hh:mm:ss a'])} />
                                    </div>
                                </FormGroup>
                            <FormGroup>
                                <Label for="tue_close">Tuesday Close</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "tue_close")}
                                        defaultValue={moment(this.state.activeLoc.tue_close, ['hh:mm:ss a'])} />
                                    </div>
                                </FormGroup>
                            <FormGroup>
                                <Button color="danger" onClick={() => this.closeLocation('tue')}>Closed</Button>
                                </FormGroup>
                                </div>
                                    <div className="modal_row_2">
                            <FormGroup>
                                <Label for="wed_open">Wednesday Open</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "wed_open")}
                                        defaultValue={moment(this.state.activeLoc.wed_open, ['hh:mm:ss a'])} />
                                    </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="wed_close">Wednesday Close</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "wed_close")}
                                        defaultValue={moment(this.state.activeLoc.wed_close, ['hh:mm:ss a'])} />
                                    </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="danger" onClick={() => this.closeLocation('wed')}>Closed</Button>
                                </FormGroup>
                            </div>
                                    <div className="modal_row_2">
                            <FormGroup>
                                <Label for="thu_open">Thursday Open</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "thu_open")}
                                        defaultValue={moment(this.state.activeLoc.thu_open, ['hh:mm:ss a'])} />
                                    </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="thu_close">Thursday Close</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "thu_close")}
                                        defaultValue={moment(this.state.activeLoc.thu_close, ['hh:mm:ss a'])} />
                                    </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="danger" onClick={() => this.closeLocation('thu')}>Closed</Button>
                                </FormGroup>
                                </div>
                                    <div className="modal_row_2">
                            <FormGroup>
                                <Label for="fri_open">Friday Open</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "fri_open")}
                                        defaultValue={moment(this.state.activeLoc.fri_open, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="fri_close">Friday Close</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "fri_close")}
                                        defaultValue={moment(this.state.activeLoc.fri_close, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="danger" onClick={() => this.closeLocation('fri')}>Closed</Button>
                                </FormGroup>
                                </div>
                                    <div className="modal_row_2">
                            <FormGroup>
                                <Label for="sat_open">Satday Open</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sat_open")}
                                        defaultValue={moment(this.state.activeLoc.sat_open, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sat_close">Saturday Close</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sat_close")}
                                        defaultValue={moment(this.state.activeLoc.sat_close, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="danger" onClick={() => this.closeLocation('sat')}>Closed</Button>
                                </FormGroup>
                                </div>
                                <div className="modal_row_2">
                            <FormGroup>
                                <Label for="sun_open">Sunday Open</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sun_open")}
                                        defaultValue={moment(this.state.activeLoc.sun_open, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sun_close">Sunday Close</Label>
                                <div className="timepicker">
                                    <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "sun_close")}
                                        defaultValue={moment(this.state.activeLoc.sun_close, ['hh:mm:ss a'])} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="danger" onClick={() => this.closeLocation('sun')}>Closed</Button>
                                </FormGroup>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" disabled={!this.state.activeLoc.id || !this.state.activeLoc.name} 
                            onClick={() => onSave(this.state.activeLoc)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


