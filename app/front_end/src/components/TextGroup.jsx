import React from "react";
import { FormGroup, Input, Col } from "reactstrap";

class TextGroup extends React.Component {
    render() {
    return (
        <>
        <Col lg="6">
            <FormGroup>
            <label
                className="form-control-label"
            >
                {this.props.label}
            </label>
            <Input
                className="form-control-alternative"
                value={this.props.value}
                type="text"
                disabled={this.props.disabled}
                onChange={this.props.func}
            />
            </FormGroup>
        </Col>
        </>
    );
    }
}

export default TextGroup;
