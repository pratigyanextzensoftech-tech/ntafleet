import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import SubLoginForm from "./SubLoginForm";
const SubLOgin = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Company" title="Manage SubLogin" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Sub-Login" />
              <CardBody>
                <SubLoginForm btnTtitle="Add Sub Login " />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Sub-Login List  "
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default SubLOgin;
