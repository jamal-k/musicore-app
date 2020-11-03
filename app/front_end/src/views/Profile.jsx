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
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import Metrics from "components/Headers/Metrics.jsx";
import TextGroup from "components/TextGroup.jsx";
import * as actionCreators from '../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuth } from '../functions/auth';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.changeUser = this.changeUser.bind(this);
  } 

  state = {
    email: "",
    pro: "",
    first_name: "",
    last_name: ""
  };


  changeUser(event) {
    var email = this.state.email
    var pro = this.state.pro
    var first_name = this.state.first_name
    var last_name = this.state.last_name

    const putMethod = {
      method: 'PUT', // Method itself
      headers: {
       'Content-type': 'application/json;', 
       'X-Access-Tokens': localStorage.getItem('token')
      },
      body: JSON.stringify({'email': email, 'first_name': first_name, 'last_name': last_name}) // We send data in JSON format
     }
     

    fetch(process.env.REACT_APP_BACKEND_URL + `api/user`, putMethod)
    .then(res => res.json())
    .then((data) => {
      alert('Saved User Information')
    })
    .catch(console.log)
  }

  componentWillMount() {
    checkAuth(this.props).then((data) => {
      this.setState({email: this.props.userName})
      fetch(process.env.REACT_APP_BACKEND_URL + `api/user/` + this.props.userName, { 
        headers: new Headers({
          'X-Access-Tokens': localStorage.getItem('token')
        }) })
      .then(res => res.json())
      .then((data) => {
        this.setState({pro: data.pro, first_name: data.first_name, last_name: data.last_name})
      })
      .catch(console.log)
    }).catch((e) => {
      this.props.history.push({
        pathname: '/auth/login'
      })
  });
    
  }
  render() {
    return (
      <>
        <Metrics />
        <Container className="mt--7" fluid>
          <Row><Col className="order-xl-1" xl="12"><Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0"><Row className="align-items-center">
                    <Col xs="8"><h3 className="mb-0">My Account</h3></Col>
                    <Col className="text-right" xs="4"><Button color="primary" onClick={this.changeUser} size="md" id="saveButton" >Save</Button></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form><h6 className="heading-small text-muted mb-4">User information</h6>
                    <div className="pl-lg-4">
                      <Row><TextGroup label="Email Address" value={this.state.email} disabled={true} /><TextGroup label="Performing Rights Organization" value={this.state.pro} disabled={true} />
                      </Row>
                      <Row><TextGroup label="First Name" value={this.state.first_name} disabled={false} func={(event) => this.setState({first_name:event.target.value})} /><TextGroup label="Last Name" value={this.state.last_name} disabled={false} func={(event) => this.setState({last_name:event.target.value})} />
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
