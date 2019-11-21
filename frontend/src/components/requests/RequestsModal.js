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

import DatePicker from 'react-date-picker';
import 'rc-time-picker/assets/index.css';
import './RequestsModal.css';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeReq: this.props.activeReq
        };
    }

    handleSelectChange = e => {
        let { name, value } = e.target;
        const activeReq = { ...this.state.activeReq, [name]: +value };
        this.setState({ activeReq });
        console.log(activeReq);
    };

    handleDateChange = (value, name) => {
        const activeReq = { ...this.state.activeReq, [name]: value };
        this.setState({ activeReq });
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Request Information</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="modal_row_1">
                            <FormGroup>
                                <Label for="employee">Employee</Label>
                                <Input type="select" name="employee" id="emp-select"
                                    value={this.state.activeReq.employee}
                                    onChange={this.handleSelectChange}
                                    placeholder = "Employee">
                                    {this.props.employees.map((emp, key) => {
                                        return (
                                            <option key={key} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                            
                        </div>
                        <div className="modal_row_1">
                            <FormGroup>
                                <Label for="leave_date">Leave Date</Label>
                                <div>
                                    <DatePicker
                                    onChange={(val) => this.handleDateChange(val, "leave_date")}
                                    value={this.state.activeReq.leave_date}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                         <div className="modal_row_1">
                            <FormGroup>
                                <Label for="return_date">Return Date</Label>
                                <div>
                                    <DatePicker
                                    onChange={(val) => this.handleDateChange(val, "return_date")}
                                    value={this.state.activeReq.return_date}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" disabled={!this.state.activeReq.employee} 
                            onClick={() => onSave(this.state.activeReq)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}