import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard"; 
import { TaPetroTab } from "../../../Data/tab/TaPetroTab";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage Ta-Petro Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Bulk Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={TaPetroTab} />
              </CardBody>
            </Card>
          </Col>
        </Row> 
        <DataTableComponent
          title="Pricing PDF List"
          tableData={dummytabledata}
          tableColumns={tableColumns}
        />
      </Container>
    </Fragment>
  );
};

export default index;
