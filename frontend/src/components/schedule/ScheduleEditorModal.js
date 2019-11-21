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
import axios from "axios";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeEmpAssign: this.props.activeEmpAssign,
            employees: []
        };
    }

    componentDidMount() {
        this.getEmployees();
    }

    handleSelectChange = e => {
        let { name, value } = e.target;
        const activeEmpAssign = { ...this.state.activeEmpAssign, [name]: +value };
        this.setState({ activeEmpAssign });
        console.log(activeEmpAssign);
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
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Change Employee</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="employee">Employee</Label>
                            <Input type="select" name="employee" id="emp-select"
                                value={this.state.activeEmpAssign.employee}
                                onChange={this.handleSelectChange}>
                                {this.state.employees.length > 0 && this.state.employees.map((emp, key) => {
                                    return (
                                        <option key={key} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeEmpAssign)}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}