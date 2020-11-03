import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import routes from "routes.js";
import generateRoute from "./layoutFunctions.jsx"

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-purple");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-purple");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return generateRoute(prop, '/auth', key)
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-secondary py-7 py-lg-8">

            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >

              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
        </div>

      </>
    );
  }
}

export default Auth;
