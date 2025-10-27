import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { upload_transaction_tab } from "../../../Data/tab/UploadTransactionTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs
        parent="Transaction"
        title="Upload Petro Canada Transactions"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Upload Transactions" />
              <CardBody>
                <BasicTabCard tabContent={upload_transaction_tab} />
              </CardBody>
            </Card>
          </Col>
        </Row> 
      </Container>
    </Fragment>
  );
};

export default index;
