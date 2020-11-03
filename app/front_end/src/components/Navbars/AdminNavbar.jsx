/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media } from "reactstrap";
import NavDrop from "../NavDrop.jsx";
import * as actionCreators from '../../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class AdminNavbar extends React.Component {

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    } 


  logout() {
    this.props.logout();
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <NavDrop userName={this.props.userName} flex="d-none d-md-flex" />
          </Container>
        </Navbar>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
