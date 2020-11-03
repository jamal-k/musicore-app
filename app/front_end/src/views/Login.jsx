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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import { Link } from 'react-router-dom'
import * as actionCreators from '../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  } 

  state = {
    email: null,
    password: null
  };


  signIn(event) {
    var email = this.state.email
    var password = this.state.password
    const postMethod = {
      method: 'POST', // Method itself
      headers: {
       'Content-type': 'application/json;', // Indicates the content 
      },
      body: JSON.stringify({'email': email, 'password': password}) // We send data in JSON format
     }
     

    fetch(process.env.REACT_APP_BACKEND_URL + `api/token/auth`, postMethod)
    .then(res => res.json())
    .then((data) => {
      if (data.login) {
        this.props.loginUserSuccess(data.token, this.state.email);

        this.props.history.push({
          pathname: '/admin/index'
        })
      } else {
        alert('Username or password incorrect')
      }
    })
    .catch(function(e) {
      console.error(e);
    })
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input placeholder="Email" type="email" onChange={(event) => this.setState({email:event.target.value})} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <Input placeholder="Password" type="password" onChange={(event) => this.setState({password:event.target.value})} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" id="signin"
                     onClick={this.signIn}  >
                    Login
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Login);


