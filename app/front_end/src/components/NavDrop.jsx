
import React from "react";
import { Link } from "react-router-dom";
import { Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

class NavDrop extends React.Component {
    render() {
        return (
            <Nav className={"align-items-center " + this.props.flex}  navbar>
            <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
            <i className="ni ni-single-02" style={{marginRight: "10px"}} />
            <span className="mb-0 text-sm font-weight-bold">
            {this.props.userName}
            </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                <span>My Account</span>
                </DropdownItem>
                <DropdownItem onClick={this.logout} to="/auth/login" tag={Link}>
                <span>Logout</span>
                </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>)
    }
}

export default NavDrop;
    