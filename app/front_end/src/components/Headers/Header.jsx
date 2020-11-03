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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import MetricCard from "./MetricCard.jsx";

class Header extends React.Component {

  state = {
    leads: [],
    month_leads: ''
  };
  

  componentDidUpdate(prevProps) {
    if(this.props.leads != prevProps.leads)
    {

      var TodayDate = new Date();
      var today_month = TodayDate.getMonth() + 1;
      var today_year = TodayDate.getFullYear();
      var prev_month = TodayDate.getMonth();

      var month_leads = this.props.leads.filter(function(o) { return o.month_added == today_month && o.year_added == today_year }).length
      var last_month_leads = this.props.leads.filter(function(o) { return o.month_added == prev_month && o.year_added == today_year }).length
      var leads_change = ((month_leads - last_month_leads) / last_month_leads) * 100

      var sold_leads = this.props.leads.filter(function(o) { return o.month_added == today_month && o.year_added == today_year && o.status == 'Successful' })
      var last_month_sold_leads = this.props.leads.filter(function(o) { return o.month_added == prev_month && o.year_added == today_year && o.status == 'Successful' })
      var sold_leads_change = ((sold_leads.length - last_month_sold_leads.length ) / last_month_sold_leads.length ) * 100
      
      var revenue = sold_leads.reduce(function (sum, o) {
        return sum + o.revenue
      }, 0);

      var prev_revenue = last_month_sold_leads.reduce(function (sum, o) {
        return sum + o.revenue
      }, 0);

      var revenue_change = ((revenue - prev_revenue ) / prev_revenue ) * 100

      var conversion_rate = (sold_leads.length / month_leads) * 100
      var prev_conversion_rate = (last_month_sold_leads.length / last_month_leads) * 100
      var conversion_rate_change = ((conversion_rate - prev_conversion_rate ) / prev_conversion_rate ) * 100
      

      this.setState({
        month_leads: month_leads,
        sold_leads: sold_leads.length,
        revenue: revenue,
        conversion_rate: Number(conversion_rate).toFixed(2),
        leads_change: Number(leads_change).toFixed(2),
        sold_leads_change: Number(sold_leads_change).toFixed(2),
        revenue_change: Number(revenue_change).toFixed(2),
        conversion_rate_change: Number(conversion_rate_change).toFixed(2)
      });
    }

  } 

  render() {
      if (this.props.events_loading) {
            return ''
        } else {
        return (
        <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <MetricCard title="Licenses Sold" 
                value={this.state.month_leads} image="icon icon-shape bg-danger text-white rounded-circle shadow" icon="fas fa-chart-bar"
                percentage={this.state.leads_change}
                />
                <MetricCard title="Leads" 
                value={this.state.sold_leads} image="icon icon-shape bg-yellow text-white rounded-circle shadow" icon="fas fa-users"
                percentage={this.state.sold_leads_change}
                />
                <MetricCard title="License Revenue" 
                value={"$" + this.state.revenue} image="icon icon-shape bg-info text-white rounded-circle shadow" icon="fas fa-money-bill"
                percentage={this.state.revenue_change}
                />
                <MetricCard title="Conversion Rate" 
                value={this.state.conversion_rate + "%"} image="icon icon-shape bg-warning text-white rounded-circle shadow" icon="fas fa-percent"
                percentage={this.state.conversion_rate_change}
                />
              </Row>
            </div>
          </Container>
        </div>
    );
        }
      }
}

export default Header;
