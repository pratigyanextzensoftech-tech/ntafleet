import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../Common/Component/HeaderCard";
import { tableColumns, dummytabledata } from "../../Data/Table/Defaultdata";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import CompanyInfoForm from "./CompanyInfoForm";
const CompanyInfo = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Company" title="Company Info" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <CompanyInfoForm btnTtitle="Search Data" btnTtitle1="Reset" />
              </CardBody>
            </Card>
          </Col>
        </Row> 
        <DataTableComponent
          title="Company List "
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default CompanyInfo;
