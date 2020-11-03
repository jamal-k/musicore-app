import React from "react";
import { CardHeader, Row } from "reactstrap";

class CardHeaderContainer extends React.Component {
    render() {
    return (
        <>
        <CardHeader className="bg-transparent">
        <Row className="align-items-center">
            <div className="col">
            <h2 className="mb-0">{this.props.title}</h2>
            </div>
        </Row>
        </CardHeader>
        </>
    );
    }
}

export default CardHeaderContainer;
