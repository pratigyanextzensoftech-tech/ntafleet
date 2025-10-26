import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
import ZeroDiscount from "./ZeroDiscount";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="TA-Petro Zero Discount Location" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add TA-Petro Zero Discount Location" />
              <CardBody>
                <ZeroDiscount btnTitle="Save Location" />
              </CardBody>
            </Card>
          </Col>
        </Row> 
        <DataTableComponent
          title="TA-Petro Location List  "
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default index;
