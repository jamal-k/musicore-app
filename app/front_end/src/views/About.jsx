
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Metrics from "components/Headers/Metrics.jsx";

class Tables extends React.Component {
  render() {
    return (
      <>
        <Metrics />
        {/* Page content */}
        <Container className="mt--7" fluid>
        <Row>
            <div className="col">
              <Card className="shadow" style={{padding: 30}}>
                <CardHeader className="border-0">
                  <h3 className="mb-0">Credit</h3>
                </CardHeader>
            <span>This dashboard was created with the <a href="https://github.com/creativetimofficial/argon-dashboard-react">Argon Dashboard</a> template from Creative Tim (C). MIT License. </span>
          </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
