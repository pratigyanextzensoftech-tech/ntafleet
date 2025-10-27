import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import Manage_EssoCent from "./Manage_EssoCent";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage Esso Cent Type" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Esso Cent Type" />
              <CardBody>
                <Manage_EssoCent btnTitle="Add Esso Cent Type" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Manage Esso Cent Type List   "
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default index;
