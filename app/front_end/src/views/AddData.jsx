import React from "react";
// reactstrap components
import { Button, Card, CardHeader, Container, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
         Row, Col, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle} from "reactstrap";

import FormGroupContainer from "components/FormGroupContainer.jsx";
import Metrics from "components/Headers/Metrics.jsx";
import SelectStatus from "components/SelectStatus.jsx";
import DatePicker from "reactstrap-date-picker";

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

class AddData extends React.Component {
    constructor (props) {
        super(props);
        this.handleClickUpload = this.handleClickUpload.bind(this);
        this.renderLoadData = this.renderLoadData.bind(this);
        this.addLead = this.addLead.bind(this);
      }

  state = {
    title: "", status: "", category: "",
    time: "", address: "", latitude: "",
    longtitude: "", venue: "", revenue: ""
  };

  componentWillMount() {
    checkAuth(this.props).then((data) => {

    }).catch((e) => {
        this.props.history.push({
          pathname: '/auth/login'
        })
    });
  }

  handleClickUpload(e) {
    this.refs.fileUploader.click();
  }

  renderLoadData = () => {
    return (<Col xl="6"  style={{marginBottom: "10px"}}>
    <Card className="shadow" id="loadDataContainer">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h2 className="mb-0">Load Data</h2>
            <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
            <button
                className="btn-icon-clipboard"
                data-clipboard-text="align-left-2"
                id="fileUploaderButton"
                type="button"
                onClick={this.handleClickUpload}
              >
                <div>
                  <i className="fas fa-upload" />
                  <span>Upload</span>
                </div>
              </button>
          </div>
        </Row>
      </CardHeader>
    </Card>
  </Col>
    );
  }

  renderCategories = () => {
    return (<select
        className="form-control-alternative form-control mb-4"
        onChange={(event) => this.setState({category:event.target.value})} >
        <option value="" disabled selected>Type</option>
        <option value="community">community</option>
        <option value="concerts">concerts</option>
        <option value="school-holidays">school-holidays</option>
        <option value="public-holidays">public-holidays</option>
        <option value="politics">politics</option>
        <option value="conferences">conferences</option>
        <option value="expos">expos</option>
        <option value="fesitvals">festivals</option>
        <option value="performing-arts">performing-arts</option>
        <option value="sports">sports</option>
        </select>
    );
  }

  addLead(e) {
    const details = {
        'id': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10), 'start': this.state.time,
        'title': this.state.title, 'rank': 50, 'category': this.state.category, 'description': "",
        'entities': [{
              "name": this.state.venue, "type": "venue", "formatted_address": this.state.address
            }],
          "location": [Number(this.state.latitude), Number(this.state.longtitude)
          ],
    }
    const postMethod = {
        method: 'POST', headers: {
          'Content-type': 'application/json; charset=UTF-8',
         'X-Access-Tokens': localStorage.getItem('token')
        }, body: JSON.stringify(details)
       }
      fetch(process.env.REACT_APP_BACKEND_URL + `api/leads`, postMethod)
      .then(res => res.json())
      .then((data) => {
          console.log(data)
          alert('Added Lead')
      })
  }
  

  render() {
    return (
      <>
        <Metrics /><Container className="mt--7" fluid><Row><Col xl="6"  style={{marginBottom: "10px"}}>
            <Card className="shadow"><CardHeader className="bg-transparent"><Row className="align-items-center">
                <div className="col"><h2 className="mb-0">Add Data</h2><Form role="form">
                    <FormGroupContainer placeholder="Title" type="text" func={(event) => this.setState({title:event.target.value})} />
                    <FormGroup><SelectStatus func={(event) => this.setState({status:event.target.value})}  /></FormGroup>
                    {this.renderCategories()}
                    <div className="mb-4"><DatePicker id="example-datepicker"  value={this.state.time} onChange={(time) => this.setState({time})} /></div>
                    <FormGroupContainer placeholder="Address" type="text" func={(event) => this.setState({address:event.target.value})} />
                    <Row><Col lg="6"><FormGroupContainer placeholder="Latitude" type="number" func={(event) => this.setState({latitude:event.target.value})} /></Col>
                  <Col lg="6"><FormGroupContainer placeholder="Longtitude" type="number" func={(event) => this.setState({longtitude:event.target.value})} /></Col></Row>
                <FormGroupContainer placeholder="Venue" type="text" func={(event) => this.setState({venue:event.target.value})} />
                <FormGroupContainer placeholder="Revenue" type="number" func={(event) => this.setState({revenue:event.target.value})} />
                <button className="btn-icon-new" id="submitLead" type="button" onClick={this.addLead}>
                    <div><i className="fas fa-plus" /><span>Add</span></div>
                </button>
                </Form>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
            {this.renderLoadData()}
          </Row>
          </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddData);

