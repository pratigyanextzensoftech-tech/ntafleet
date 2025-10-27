import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import PetroForm from "./PetroForm";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Retail Prices" title="Petro Retail Price" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <PetroForm btnTitle="Search Data" btnTitle1="Reset" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Petro Retail List "
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default index;
