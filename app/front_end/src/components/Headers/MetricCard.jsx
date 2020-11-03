
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class MetricCard extends React.Component {
  render() {
    return (
      <>
        <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0">
            <CardBody><Row><div className="col"><CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    {this.props.title}
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">{this.props.value}</span>
                </div>
                <Col className="col-auto"><div className={this.props.image}><i className={this.props.icon} /></div></Col>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                {this.props.percentage >  0 ?
                    <span className="text-success mr-2"><i className="fa fa-arrow-up" /> {this.props.percentage}%
                    </span>:
                    <span className="text-danger mr-2">
                    <i className="fa fa-arrow-down" /> {this.props.percentage}%
                </span>}
                <span className="text-nowrap"> Since last month</span></p>
            </CardBody>
            </Card>
        </Col>
      </>
    );
  }
}

export default MetricCard;
