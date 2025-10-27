import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { FgRack } from "../../../Data/tab/FgRackTab";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Update FG Rack Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Update FG Rack Cent" />
              <CardBody>
                <BasicTabCard tabContent={FgRack} />
              </CardBody>
            </Card>
          </Col>
        </Row>
          <DataTableComponent     title="Rack Cent List"                tableData={dummytabledata}
                tableColumns={tableColumns}
              />
      </Container>
    </Fragment>
  );
};

export default index;
