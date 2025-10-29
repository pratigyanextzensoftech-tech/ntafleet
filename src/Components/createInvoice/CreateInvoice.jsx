import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../Common/Component/HeaderCard";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { CreateInvoiceDumyData } from "../../Data/tab/CreateInvoiceDumyData";
const CreateInvoice = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Create New Invoice" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create New Invoice" />
              <CardBody>
                <BasicTabCard tabContent={CreateInvoiceDumyData} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateInvoice;
