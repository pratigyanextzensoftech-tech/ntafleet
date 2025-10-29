import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col,Card,CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { CreateReportTab } from "../../../Data/tab/CreateReportTab";
// import MoneyCodeList from '../../moneyCodeList/MoneyCodeListForm'
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Reporting" title=" Create Report" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Report" />
              <CardBody>
                <BasicTabCard
                  title="Create Report"
                  tabContent={CreateReportTab}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default index;
