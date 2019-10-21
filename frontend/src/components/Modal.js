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
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeEmp)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}