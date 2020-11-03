
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Button, Badge, Card, CardHeader, CardBody, Pagination, CardFooter, PaginationItem, PaginationLink,
  Container, Row, Col, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle,
} from "reactstrap";
import { CSVLink } from "react-csv";
import Table from "components/Table.jsx";
import Header from "components/Headers/Header.jsx";
import Metrics from "components/Headers/Metrics.jsx";
import Map from "components/Map.jsx";
import { checkAuth } from '../functions/auth';
import * as actionCreators from '../actions/auth';
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

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, filteredRows },
}) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <select
      className="form-control-alternative form-control"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)

      }}

    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.csvLink = React.createRef();
  }

  state = {
    events: [], table_data: [{}], data: [], columns: [], loading: true
  };

  componentWillMount() {
    checkAuth(this.props).then((data) => {
      fetch(process.env.REACT_APP_BACKEND_URL + 'api/leads', {
        headers: new Headers({
          'X-Access-Tokens': localStorage.getItem('token')
        })
      })
        .then(res => res.json())
        .then((data) => {
          this.setState({ events: data })
          this.state.data = this.state.events.map(function (lead) {
            return {
              'id': lead.id, 'title': lead.details.title, 'location': (lead.details.entities && lead.details.entities[0] ? lead.details.entities[0].formatted_address : null), 'confidence': lead.confidence, 'status': lead.status, 'saved': lead.saved ? "Yes" : "No"
            };
          });
          this.setState({ loading: false })
        })
        .catch(console.log)

      this.state.columns = [
        { Header: 'Id', accessor: 'id' },
        { Header: 'Title', accessor: 'title', Cell: row => <div style={{ fontWeight: "bold" }}>{row.value}</div> },
        { Header: 'Location', accessor: 'location' },
        {
          Header: 'Confidence', accessor: 'confidence', Filter: SelectColumnFilter, filter: 'includes',
          Cell: row =>
            <Badge color="" className="badge-dot"> <i className={row.value == 'High' ? 'bg-success' : row.value == 'Medium' ? 'bg-warning' : 'bg-danger'} />{row.value}</Badge>
        },
        { Header: 'Status', accessor: 'status', Filter: SelectColumnFilter, filter: 'includes' },
        { Header: 'Saved', accessor: 'saved', Filter: SelectColumnFilter, filter: 'includes' }
      ]
    }).catch((e) => {
      this.props.history.push({
        pathname: '/auth/login'
      })
    });
  }
  fetchDetails = (rowobject) => {
    var id = rowobject.values.id
    this.props.history.push({
      pathname: 'details',
      id: id,
      search: '?id=' + id
    })
  }

  getCSV = () => {
    this.csvLink.current.link.click()
  }

  changeData(data) {
    var new_data = data.reduce(function (res, obj) {
      res.push(obj.values)
      return res;
    }, [])
    this.setState({ table_data: new_data })
  }

  render() {
    return (
      <>
        <Metrics />
        <Container className="mt--7" fluid>
          <Row>
            <Col xl="12" style={{ marginBottom: "10px" }}>
              <Button id="exportbutton" style={{ float: "right" }} onClick={this.getCSV}>
                <div>
                  <i className="fas fa-download" />
                  <span>Export</span>
                </div>
              </Button>
              <CSVLink data={this.state.table_data} filename={'leads.csv'} className="hidden" ref={this.csvLink} target="_blank"
              />
            </Col>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Leads</h3>
                </CardHeader>
                {this.state.loading &&
                  <div></div>
                }
                {!this.state.loading &&
                  <Table data={this.state.data} columns={this.state.columns} rowInfo={this.fetchDetails} changeHandler={this.changeData.bind(this)} />
                }
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
