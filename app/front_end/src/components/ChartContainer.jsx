
import React from "react";

// reactstrap components
import Chart from "chart.js";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Line, Bar, Doughnut } from "react-chartjs-2";

class ChartContainer extends React.Component {
  render() {
    return (
      <>
            <Col className="mb-5 mb-xl-0" xl="6"> <Card className="shadow"><CardHeader className="bg-transparent">
                  <Row className="align-items-center"><div className="col"><h6 className="text-uppercase ls-1 mb-1">{this.props.title}</h6>
                      <h2 className="mb-0">{this.props.subtitle}</h2></div></Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                  {this.props.chart_type == 'Line' &&
                    <Line data={this.props.data} options={this.props.options} />
                  }
                   {this.props.chart_type == 'Bar' &&
                    <Bar data={this.props.data} options={this.props.options} />
                  }
                   {this.props.chart_type == 'Doughnut' &&
                    <Doughnut data={this.props.data} options={this.props.options} legend={this.props.legend} />
                  }
                  </div>
                </CardBody>
              </Card>
            </Col>
      </>
    );
  }
}

export default ChartContainer;
