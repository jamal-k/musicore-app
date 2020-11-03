import React from "react";
import { PaginationItem, PaginationLink } from "reactstrap";

class PaginationContainer extends React.Component {
    render() {
    return (
        <PaginationItem>
        <PaginationLink
            onClick={this.props.func}>
            <i className={"fas " + this.props.icon} />
            <span className="sr-only">{this.props.text}</span>
        </PaginationLink>
        </PaginationItem>
    );
    }
}

export default PaginationContainer;
