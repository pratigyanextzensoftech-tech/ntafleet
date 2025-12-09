import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import TransactionList from "../transactionList/TransactionList";
import CheckTransaction from "./CheckTransaction";
const index = () => {
  const handleSearch=()=>{
    
  }
  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title=" Check Transactions" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <CheckTransaction btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="6">
            <DataTableComponent
              title="All Transactions List"
              tableData={dummytabledata}
              tableColumns={tableColumns}
            />
          </Col>
          <Col sm="6">
            <DataTableComponent
              title="Invoiced Transactions List "
              tableData={dummytabledata}
              tableColumns={tableColumns}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <DataTableComponent
            title="Missing Transactions List "
            tableData={dummytabledata}
            tableColumns={tableColumns}
          />
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
