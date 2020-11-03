
import React from "react";
import { Badge, Card, CardHeader, Table, Container, Row, Col, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Input } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import Metrics from "components/Headers/Metrics.jsx";
import SelectStatus from "components/SelectStatus.jsx";
import Map from "components/Map.jsx";
import CardHeaderContainer from "components/CardHeaderContainer.jsx";
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

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeSaved = this.changeSaved.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.updateRevenue = this.updateRevenue.bind(this);
    this.renderDetailsContainer = this.renderDetailsContainer.bind(this);
    this.renderGenerationProcess = this.renderGenerationProcess.bind(this);
  }

  state = {
    event: null, tweets: [], generation_process: "", modal: false, revenue: null
  };

  componentWillMount() {
    checkAuth(this.props).then((data) => {
      var data = this.props.location;
      if (data) {
        if (data.search) {
          let search = window.location.search;
          let params = new URLSearchParams(search);
          var id = params.get('id');
          var headers = new Headers({
            'X-Access-Tokens': localStorage.getItem('token')
          })
          Promise.all([
            fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${id}`, { headers: headers }), fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${id}/generationprocess`, { headers: headers }), fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${id}/tweets`, { headers: headers })
          ])
            .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
            .then(([data1, data2, data3]) => this.setState({
              event: data1, generation_process: data2['generation_process'], tweets: data3
            })).catch(console.log)
        }
      }
    }).catch((e) => {
      this.props.history.push({
        pathname: '/auth/login'
      })
    });
  }

  updateEvent() {
    if (this.state.event[0].id) {
      fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${this.state.event[0].id}`, {
        headers: new Headers({
          'X-Access-Tokens': localStorage.getItem('token')
        })
      })
        .then(res => res.json())
        .then((data) => {
          this.setState({ event: data })
        })
        .catch(console.log)
    }
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  };

  updateRevenue() {
    const putMethod = {
      method: 'PUT', // Method itself
      headers: {
        'Content-type': 'application/json; charset=UTF-8','X-Access-Tokens': localStorage.getItem('token')
      },
      body: JSON.stringify({ 'revenue': this.state.revenue }) // We send data in JSON format
    }
    fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${this.state.event[0].id}/revenue`, putMethod)
      .then(res => res.json())
      .then((data) => {
        this.state.event[0].revenue = this.state.revenue
        let lead_copy = JSON.parse(JSON.stringify(this.state.event))
        lead_copy[0].revenue = this.state.revenue
        this.setState({ event: lead_copy })
      })
      .catch(console.log)
    this.setState({ modal: !this.state.modal })
  };

  changeStatus(event) {
    console.log(this.state.tweets)
    var value = event.target.value
    var id = this.state.event[0].id
    const putMethod = {
      method: 'PUT', // Method itself
      headers: {
        'Content-type': 'application/json; charset=UTF-8', 'X-Access-Tokens': localStorage.getItem('token')
      },
      body: JSON.stringify({ 'status': value })
    }
    fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${id}/status`, putMethod)
      .then(res => res.json())
      .then((data) => {
      })
      .catch(console.log)
    if (value == 'Successful') {
      this.toggle()
    }
  }

  changeSaved(event) {
    var id = this.state.event[0].id
    const putMethod = {
      method: 'PUT', // Method itself
      headers: {
        'Content-type': 'application/json; charset=UTF-8', 'X-Access-Tokens': localStorage.getItem('token')
      },
      body: JSON.stringify({ 'saved': this.state.event[0].saved ? false : true }) // We send data in JSON format
    }
    fetch(process.env.REACT_APP_BACKEND_URL + `api/leads/${id}/save`, putMethod)
      .then(res => res.json())
      .then((data) => {
        this.updateEvent()
      })
      .catch(console.log)
  }

  renderDetailsContainer = () => {
    return (
      <Col xl="6">
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row>
              <div className="col"><h2 className="mb-0" style={{ textAlign: "left", float: "left" }}>{this.state.event[0].details.title}</h2></div>
              <div className="col" style={{ display: "flex" }}>
              <SelectStatus style={{ marginLeft: "auto" }} id="select-change" defaultStatus={this.state.event[0].status} func={this.changeStatus} />
              </div>
            </Row>
          </CardHeader>
          <div style={{ padding: "20px" }}>
            <span><b>Description:</b> {this.state.event[0].details.description}</span><br />
            <span><b>Category:</b> {this.state.event[0].details.category}</span><br />
            <span><b>Date:</b> {this.state.event[0].details.start}</span><br />
            <span><b>Location:</b> {this.state.event[0].details.entities.length > 0 && this.state.event[0].details.entities[0].formatted_address}</span><br />
            <span><b>Venue:</b> {this.state.event[0].details.entities[0].name}</span><br />
            <span><b>Revenue:</b> ${this.state.event[0].revenue}</span><br />
            <span><b>Confidence:</b>
              <Badge color="" className="badge-dot"><i className={this.state.event[0].confidence == 'High' ? 'bg-success' : this.state.event[0].confidence == 'Medium' ? 'bg-warning' : 'bg-danger'} /></Badge>
              {this.state.event[0].confidence}
            </span>
          </div>
        </Card>
      </Col>
    );
  }

  renderGenerationProcess = () => {
    return (<Row>
      <Col xl="6">
        <Card className="shadow">
          <CardHeaderContainer title="Generation Process" />
          <div style={{ padding: "20px" }}>{ReactHtmlParser(this.state.generation_process)}</div>
        </Card>
      </Col>
      <Col xl="6">
        <Card className="shadow">
          <CardHeaderContainer title="Relevant Tweets" />
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr><th scope="col">Tweet</th><th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tweets.map((tweet, index) => (
                <tr key={index}>
                  <th scope="row" >{tweet.tweet}</th>
                  <td>
                    {tweet.date_created}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
    );
  }

  render() {
    if (this.state.event) {
      return (
        <>
          <Metrics />
          <Container className="mt--7" fluid>
            <Row style={{ marginBottom: "10px" }}>
              <Col xl="3" style={{ marginLeft: "auto" }}>
                <Card className="shadow border-0"><Button onClick={this.changeSaved}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {this.state.event[0].saved ? "Unsave" : "Save"}
                      <i className={this.state.event[0].saved ? "fas fa-bookmark" : "far fa-bookmark"} style={{ marginLeft: "auto" }} />
                    </div>
                  </Button>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col className="mb-5 mb-xl-0" xl="6"><Card className="shadow border-0"><Map events={this.state.event} /></Card></Col>
              {this.renderDetailsContainer()}
            </Row>
            {this.renderGenerationProcess()}
          </Container>
          <Modal isOpen={this.state.modal} toggle={this.toggle}><ModalBody>How much did this license sell for?
              <Input className="form-control-alternative" id="input-pro" placeholder="$" type="number" onChange={(event) => this.setState({ revenue: event.target.value })} />
            </ModalBody>
            <ModalFooter><Button color="primary" onClick={this.updateRevenue}>Submit</Button></ModalFooter>
          </Modal>
        </>
      );
    } else {
      return (
        <>
        </>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
