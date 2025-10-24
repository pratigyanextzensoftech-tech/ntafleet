import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import FormComponent from "./Form";
import { Container,Row,Col,Card,CardBody } from "reactstrap";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import { tableColumns } from "../../Data/Table/Defaultdata";
import HeaderCard from "../Common/Component/HeaderCard";
import { dummytabledata } from "../../Data/Table/Defaultdata";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Manage User" title="Manage User" />
      <Container fluid={true}>

        <Row>
       <Col sm="12">
         <Card>
           <HeaderCard title="Add User" />
           <CardBody>
            <FormComponent />
           </CardBody>
         </Card>
       </Col>
     </Row>
      
        {/* <BasicInputCard2 /> */}
        <DataTableComponent
          title="User List"
          tableColumns={tableColumns}
          tableData={dummytabledata}
        />
      </Container>
    </Fragment>
  );
};

export default index;
