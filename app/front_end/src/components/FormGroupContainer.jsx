
import React from "react";
import { FormGroup, Input, Col, InputGroup } from "reactstrap";

class FormGroupContainer extends React.Component {
    render() {
    return (
        <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
        <Input placeholder={this.props.placeholder} type={this.props.type} onChange={this.props.func} />
        </InputGroup>
        </FormGroup>
    );
    }
}

export default FormGroupContainer;
