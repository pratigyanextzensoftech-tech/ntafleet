import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import DownloadEssoCentForm from "./DownloadEssoCentForm";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Download ESSO Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Download ESSO Cent" />
              <CardBody>
                <DownloadEssoCentForm btnTitle="Search" />
              </CardBody>
            </Card>
          </Col> 
        </Row> 
        <DataTableComponent
          title="ESSO Cent List  "
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default index;
