
import React from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Badge, Button, Card, CardHeader, CardBody, NavItem, NavLink, Nav, Progress, Table, Container, Row, Col } from "reactstrap";
import { chartOptions, parseOptions, chartExample1, chartExample2, chartExample4} from "variables/charts.jsx";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkAuth } from '../functions/auth';
import Header from "components/Headers/Header.jsx";
import Map from "components/Map.jsx";
import * as actionCreators from '../actions/auth';
import ChartContainer from "components/ChartContainer.jsx";

function mapStateToProps(state) {
  return {
      token: state.auth.token,
      userName: state.auth.userName,
      isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    events: [], current_month_leads: [], businesses: [], events_loading: true, google_maps_key: "",
    data_revenue:null, data_number:null, data_categories: null, data_venues: null, chart_loading: true,
  };

  setChartRevenue() {
    var chart_1 = this.state.events.reduce(function(res, obj) {
    var month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var month_name = month_array[obj.month_added - 1];
      if (!(month_name in res)) {
          res[month_name] = obj.revenue;
      } else {
          res[month_name] += obj.revenue;
      }
      return res;
    }, {})
    const revenue_keys = Object.keys(chart_1)
    const revenue_values = Object.values(chart_1)

    this.setState({data_revenue: {
      labels: revenue_keys,
      datasets: [
        {
          label: "Revenue",
          data: revenue_values
        }
      ]
    }})
  }

  setChartLeads() {
    var chart_2 = this.state.events.reduce(function(res, obj) {
      var month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var month_name = month_array[obj.month_added - 1];
      if (!(month_name in res)) {
          res[month_name] = 1;
      } else {
          res[month_name] += 1;
      }
      return res;
    }, {})
    const number_keys = Object.keys(chart_2)
    const number_values = Object.values(chart_2)

    this.setState({data_number: {
      labels: number_keys,
      datasets: [
        {
          label: "Performance",
          data: number_values
        }
      ]
    }})
  }

  setChartCategories() {
    var chart_3 = this.state.events.reduce(function(res, obj) {
      if (!(obj.details.category in res)) {
          res[obj.details.category] = 1;
      } else {
          res[obj.details.category] += 1;
      }
      return res;
    }, {})
    const category_keys = Object.keys(chart_3)
    const category_values = Object.values(chart_3)

    this.setState({data_categories: {labels: category_keys,
    datasets: [
      {
        data: category_values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#0072dc',
          '#RAAE56'
          ]
        
      }
    ]
    }});
  }

  setChartVenues() {
    var chart_4 = this.state.events.reduce(function(res, obj) {
      if (obj.details.entities.length > 0) {
        if (!(obj.details.entities[0].name in res)) {
            res[obj.details.entities[0].name] = 1;
        } else {
            res[obj.details.entities[0].name] += 1;
        }
      }
      return res;
    }, {})
    var chart_4_items = Object.keys(chart_4).map(function(key) {return [key, chart_4[key]];});
    chart_4_items.sort(function(first, second) {return second[1] - first[1];});
    chart_4_items = chart_4_items.slice(0, 5);
    var venue_keys =  chart_4_items.reduce(function(res, obj) {
      res.push(obj[0])
      return res
    }, [])
    var venue_values =  chart_4_items.reduce(function(res, obj) {
      res.push(obj[1])
      return res
    }, [])
    this.setState({data_venues: {labels: venue_keys,
      datasets: [
        {data: venue_values,backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#0072dc','#RAAE56']
        }
      ]
      }});
  }

  componentWillMount() {
    checkAuth(this.props).then((data) => {
      if (window.Chart) {
        parseOptions(Chart, chartOptions());
      }

      fetch(process.env.REACT_APP_BACKEND_URL + 'api/leads', { 
        headers: new Headers({
          'X-Access-Tokens': localStorage.getItem('token')
        }) })
        .then(res => res.json())
        .then((data) => {
          this.setState({ events: data })
          var today_date = new Date()
          var today_month =  today_date.getMonth() + 1
          var today_year = today_date.getFullYear()
          var month_leads = data.filter(function (o) { return o.month_added == today_month && o.year_added == today_year })
          this.setState({ current_month_leads: month_leads })
          this.setState({ events_loading: false })
          this.setChartRevenue()
          this.setChartLeads()
          this.setChartCategories()
          this.setChartVenues()
          this.setState({chart_loading :false})
        }).catch(console.log)
      }).catch((e) => {
        this.props.history.push({
          pathname: '/auth/login'
        })
        console.error(e)
    });

  }

  renderNewLeadsTable = () => { return (
  <Table className="hover-table align-items-center table-flush">
  <thead className="thead-light">
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Confidence</th>
    </tr>
  </thead>
  <tbody>
    {this.state.current_month_leads.map((event, index) => (
      <tr key={index} onClick={() => this.fetchDetails(event.id)}>
        <th scope="row" >{event.details.title}</th>
        <td>
          <Badge color="" className="badge-dot">
            <i className={event.confidence == 'High' ? 'bg-success' : 'bg-warning'} />
            {event.confidence}
          </Badge>
        </td>
      </tr>
    ))}

  </tbody>
</Table>);
}

  fetchDetails = (id) => {
    this.props.history.push({
      pathname: 'details',
      id: id,
      search: '?id=' + id
    })
  }

  render() {
    return (
      <>
        <Header leads={this.state.events} events_loading={this.state.events_loading} />
        <Container className="mt--7" fluid>
          <Row><Col className="mb-5 mb-xl-0" xl="8"><Card className="shadow border-0">
                <Map events={this.state.current_month_leads} events_loading={this.state.events_loading} />
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="top-leads-container align-items-center">
                    <div className="col">
                      <h2 className="mb-0">New Leads</h2>
                    </div>
                  </Row>
                </CardHeader>
                <div style={{ overflow: 'auto', height: '400px' }}>
                {this.renderNewLeadsTable()}
                </div>
              </Card>
            </Col>
          </Row>
          { !this.state.chart_loading &&
          <div>
          <Row className="mt-5">
            <ChartContainer title="Revenue" subtitle="License Sales Value" chart_type="Line" data={this.state.data_revenue} options={chartExample1.options} />
            <ChartContainer title="Performance" subtitle="Leads" chart_type="Bar" data={this.state.data_number} options={chartExample2.options} />
          </Row>
          <Row className="mt-5">
            <ChartContainer title="Successful Leads: Past Month" subtitle="Category" chart_type="Doughnut" data={this.state.data_categories} options={chartExample4.options} legend={chartExample4.legend} />
            <ChartContainer title="Successful Leads: Past Month" subtitle="Top 5 Venues" chart_type="Doughnut" data={this.state.data_venues} options={chartExample4.options} legend={chartExample4.legend} />
          </Row>
          </div>
          }
        </Container>
      </>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
