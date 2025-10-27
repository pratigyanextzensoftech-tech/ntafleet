import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { CreateReportTab } from "../../../Data/tab/CreateReportTab";
import { UploadFjPricingTab } from "../../../Data/tab/UploadFjPricingTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title=" Upload  Pricing" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Upload  Pricing" />
              <CardBody>
                <BasicTabCard tabContent={UploadFjPricingTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
