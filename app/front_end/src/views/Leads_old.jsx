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
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Pagination,
  CardFooter,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import DatePicker from "reactstrap-date-picker";
import { CSVLink } from "react-csv";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
  useGlobalFilter
} from 'react-table'
import matchSorter from 'match-sorter'

import Header from "components/Headers/Header.jsx";
import Metrics from "components/Headers/Metrics.jsx";
import Map from "components/Map.jsx";


function Table({ columns, data, rowInfo, changeHandler }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, page, canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage, prepareRow,
    state: { pageIndex, pageSize },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter } = useTable({
      columns, data, initialState: { pageIndex: 0, hiddenColumns: ['id'] }, defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    }, useFilters, useGlobalFilter, usePagination)



  useMemo(() => changeHandler(rows), [rows]);

  // Render Data Table UI
  return (
    <div>
      <table {...getTableProps()} className="align-items-center table-flush hover-table table">
        <thead className="thead-light">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} scope="col">
              {headerGroup
                .headers
                .map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>

                ))}

            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} >
          {
            page.map(
              (row, i) =>
                prepareRow(row) || (
                  <tr {...row.getRowProps({ onClick: () => rowInfo(row) })} >
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
            )}
        </tbody>
      </table>
      <CardFooter className="py-4">
        <nav aria-label="...">
          <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
          >
            <PaginationItem>
              <PaginationLink
                onClick={() => previousPage()} disabled={!canPreviousPage}>
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>

            <span style={{ verticalAlign: 'middle' }}>
              Page{' '}
              <strong>
                {pageIndex + 1}</strong> of {pageOptions.length}
            </span>

            <PaginationItem>
              <PaginationLink
                onClick={() => nextPage()} disabled={!canNextPage}>

                <i className="fas fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      </CardFooter>

    </div>
  )



}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, filteredRows },
}) {
  const count = preFilteredRows.length

  return (
    <input className="form-control-alternative form-control"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely

      }}
      placeholder={`Search`}
    />
  )
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, filteredRows },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
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

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.csvLink = React.createRef();

    this.state = {
      events: [],
      table_data: [{}],
      data: [],
      columns: [],
      loading: true,
      value: new Date().toISOString(),
      onlySaved: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    fetch(process.env.REACT_APP_BACKEND_URL + 'api/leads')
      .then(res => res.json())
      .then((data) => {
        this.setState({ events: data })
        this.state.data = this.state.events.map(function (lead) {
          return {
            'id': lead.id,
            'title': lead.details.title,
            'location': (lead.details.entities && lead.details.entities[0] ? lead.details.entities[0].formatted_address : null),
            'confidence': lead.confidence,
            'status': lead.status
          };

        });

        this.setState({ loading: false })
      })
      .catch(console.log)


    this.state.columns = [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: row => <div style={{ fontWeight: "bold" }}>{row.value}</div>,
      }, {
        Header: 'Location',
        accessor: 'location'
      }, {
        Header: 'Confidence',
        accessor: 'confidence',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: row =>
          <Badge color="" className="badge-dot">
            <i className={
              row.value == 'High' ?
                'bg-success' :
                row.value == 'Medium' ?
                  'bg-warning' :
                  'bg-danger'} />{row.value}</Badge>
      }, {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
    ]
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
    console.log(new_data)
    this.setState({ table_data: new_data })

  }

  handleChange(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    })
  }

  handleInputChange(event) {
    this.setState({})
  }

  render() {
    return (
      <>
        <Metrics />
        <Container className="mt--7" fluid>
          <Row>
            <Col xl="12" style={{ marginBottom: "10px" }}>
              <Button style={{ float: "right" }} onClick={this.getCSV}>
                <div>
                  <i className="fas fa-download" />
                  <span>Export</span>
                </div>
              </Button>

              <CSVLink
                data={this.state.table_data}
                filename={'leads.csv'}
                className="hidden"
                ref={this.csvLink}
                target="_blank"
              />

            </Col>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div style={{ display: "flex" }}>
                    <h3 className="mb-0">Leads</h3>
                    {/* <div style={{ marginLeft: "auto", float: "right" }}>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                          onClick={this.}
                        />
                        <label
                          className="custom-control-label"
                          style={{ fontSize: "16px" }}
                          htmlFor="customCheckRegister"
                        >
                          Only show saved leads
                        </label>
                      </div>
                    </div> */}
                  </div>
                </CardHeader>
                {this.state.loading &&
                  <div></div>
                }
                {!this.state.loading &&
                  <Table
                    data={this.state.data}
                    columns={this.state.columns}
                    rowInfo={this.fetchDetails}
                    changeHandler={this.changeData.bind(this)}
                  />
                }

              </Card>
            </div>


          </Row>

        </Container>
      </>
    );
  }
}

export default Leads;
