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
            activeLoc: this.props.activeLoc,
            btnsDisabled: {
                'btn-mon': false,
                'btn-tue': false,
                'btn-wed': false,
                'btn-thu': false,
                'btn-fri': false,
                'btn-sat': false,
                'btn-sun': false
            }
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
        if(value != null){
            const activeLoc = { ...this.state.activeLoc, [name]: value.format('HH:mm:ss') };
            this.setState({ activeLoc });
        }
    };

    closeLocation = (value, btn) => {
        if(value === 'mon'){
            const activeLoc = { ...this.state.activeLoc, monday_open: '00:00:00', monday_close: '00:00:00' };
            this.setState({ activeLoc });
        }
        else if(value === 'tue'){
            const activeLoc = { ...this.state.activeLoc, tue_open: '00:00:00', tue_close: '00:00:00' };
            this.setState({ activeLoc });
        }
        else if(value === 'wed'){
            const activeLoc = { ...this.state.activeLoc, wed_open: '00:00:00', wed_close: '00:00:00' };
            this.setState({ activeLoc });
        }
        else if(value === 'thu'){
            const activeLoc = { ...this.state.activeLoc, thu_open: '00:00:00', thu_close: '00:00:00' };
            this.setState({ activeLoc });
        }
        else if(value === 'fri'){
            const activeLoc = { ...this.state.activeLoc, fri_open: '00:00:00', fri_close: '00:00:00' };
            this.setState({ activeLoc });
        }
        else if(value === 'sat'){
            const activeLoc = { ...this.state.activeLoc, sat_open: '00:00:00', sat_close: '00:00:00' };
            this.setState({ activeLoc });
        }
        else if(value === 'sun'){
            const activeLoc = { ...this.state.activeLoc, sun_open: '00:00:00', sun_close: '00:00:00' };
            this.setState({ activeLoc });
        }

        let btnsDisabled = this.state.btnsDisabled;
        btnsDisabled = { ...btnsDisabled, [btn]: true };

        this.setState({ btnsDisabled });
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
                            <Label for="monday_open">Monday Open</Label>
                            <div className="timepicker">
                                <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "monday_open")}
                                    defaultValue={moment(this.state.activeLoc.monday_open, ['hh:mm:ss a'])} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="monday_close">Monday Close</Label>
                            <div className="timepicker">
                                <TimePicker minuteStep={15} use12Hours={true} showSecond={false} onChange={(val) => this.handleTimeChange(val, "monday_close")}
                                    defaultValue={moment(this.state.activeLoc.monday_close, ['hh:mm:ss a'])} />
                                </div>
                             </FormGroup>
                        <FormGroup>
                        <Button disabled={this.state.btnsDisabled["btn-mon"]} color="danger" onClick={() => this.closeLocation('mon', 'btn-mon')}>Closed</Button>
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
                            <Button disabled={this.state.btnsDisabled["btn-tue"]} color="danger" onClick={() => this.closeLocation('tue', 'btn-tue')}>Closed</Button>
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
                            <Button disabled={this.state.btnsDisabled["btn-wed"]} color="danger" onClick={() => this.closeLocation('wed', 'btn-wed')}>Closed</Button>
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
                            <Button disabled={this.state.btnsDisabled["btn-thu"]} color="danger" onClick={() => this.closeLocation('thu', 'btn-thu')}>Closed</Button>
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
                            <Button disabled={this.state.btnsDisabled["btn-fri"]} color="danger" onClick={() => this.closeLocation('fri', 'btn-fri')}>Closed</Button>
                                </FormGroup>
                                </div>
                                    <div className="modal_row_2">
                            <FormGroup>
                                <Label for="sat_open">Saturday Open</Label>
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
                            <Button disabled={this.state.btnsDisabled["btn-sat"]} color="danger" onClick={() => this.closeLocation('sat', 'btn-sat')}>Closed</Button>
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
                            <Button disabled={this.state.btnsDisabled["btn-sun"]} color="danger" onClick={() => this.closeLocation('sun', 'btn-sun')}>Closed</Button>
                                </FormGroup>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" disabled={!this.state.activeLoc.name} 
                            onClick={() => onSave(this.state.activeLoc)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


