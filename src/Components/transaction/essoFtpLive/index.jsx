import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import EssoFtpLive from "./EssoFtpLiveForm";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Transaction"
        title=" ESSO FTP To Live Transactions"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Copy ESSO FTP To Live Transactions" />
              <CardBody>
                <EssoFtpLive btnTitle="Copy Data" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
