import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
import { UltramarBulkTab } from "../../../Data/tab/UltramarBulkTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage ULTRAMAR Bulk Pricing PDF" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create ULTRAMAR Bulk Pricing PDF" />
              <CardBody>
                <BasicTabCard tabContent={UltramarBulkTab} />
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
