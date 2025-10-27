import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { TaPetroRackTab } from "../../../Data/tab/TaPetroRackTab";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Update Ta-Petro Rack Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Update Ta-Petro Rack Cent" />
              <CardBody>
                <BasicTabCard tabContent={TaPetroRackTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
         <DataTableComponent title="Rack Cent List" tableData={dummytabledata} tableColumns={tableColumns}/>
      </Container>
    </Fragment>
  );
};
export default index;
