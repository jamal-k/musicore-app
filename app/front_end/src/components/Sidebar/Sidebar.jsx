import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import NavDrop from "../NavDrop.jsx";

// reactstrap components
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, NavbarBrand,
         Navbar, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Sidebar extends React.Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  renderCollapse = (logo, routes) => {
    return (<Collapse navbar isOpen={this.state.collapseOpen}>
      {/* Collapse header */}
      <div className="navbar-collapse-header d-md-none">
        <Row>
          {logo ? (
            <Col className="collapse-brand" xs="6">
              {logo.innerLink ? (
                <Link to={logo.innerLink}>
                  <img alt={logo.imgAlt} src={logo.imgSrc} />
                </Link>
              ) : (
                <a href={logo.outterLink}>
                  <img alt={logo.imgAlt} src={logo.imgSrc} />
                </a>
              )}
            </Col>
          ) : null}
          <Col className="collapse-close" xs="6">
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span />
              <span />
            </button>
          </Col>
        </Row>
      </div>
      {/* Navigation */}
      <Nav navbar>{this.createLinks(routes)}</Nav>
      {/* Divider */}
      <hr className="my-3" />
    </Collapse>
    );
  }


  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return ! (['Login', 'Register', 'Details', 'Profile', 'Home'].indexOf(prop.name) >= 0) ? (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      ) : "";
    });
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    return (
      <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main" >
        <Container fluid>
          <button id="buttonCollapse" className="navbar-toggler" type="button" onClick={this.toggleCollapse} >
            <span className="navbar-toggler-icon" />
          </button>
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
            </NavbarBrand>
          ) : null}
          {this.renderCollapse(logo, routes)}
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
