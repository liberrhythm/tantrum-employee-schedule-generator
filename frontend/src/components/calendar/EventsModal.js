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
import DatePicker from 'react-date-picker';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeEvent: this.props.activeEvent
        };
    }

    handleTextChange = e => {
        let { name, value } = e.target;
        const activeEvent = { ...this.state.activeEvent, [name]: value };
        this.setState({ activeEvent });
    };

    handleDateChange = (value, name) => {
        const activeEvent = { ...this.state.activeEvent, [name]: value };
        this.setState({ activeEvent });
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Event Entry</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="modal_row_1">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={this.state.activeEvent.title}
                                    onChange={this.handleTextChange}
                                    placeholder="Enter Event Title"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="event_start">Event Start</Label>
                                <div>
                                    <DatePicker
                                        onChange={(val) => this.handleDateChange(val, "event_start")}
                                        value={this.state.activeEvent.event_start}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="event_end">Event End</Label>
                                <div>
                                    <DatePicker
                                        onChange={(val) => this.handleDateChange(val, "event_end")}
                                        value={this.state.activeEvent.event_end}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" disabled={!this.state.activeEvent.title && !this.state.activeEvent.event_start && !this.state.activeEvent.event_end} 
                            onClick={() => onSave(this.state.activeEvent)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}