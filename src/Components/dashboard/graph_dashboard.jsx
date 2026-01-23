import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../Common/Component/HeaderCard";
import Chart from '../Charts/ChartsJs/index'
import SearchForm from "./SearchForm";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Dashboard" title="Dashboard" />
      <Container fluid={true}>
      <Row>
       <Col sm="12">
         <Card>
           <HeaderCard title="Select Multiple and Delete Single Data" />
           <CardBody>
            {/* <SearchForm title="Filters" btnTitle="Add Card" btnTitle1="Reset"  /> */}
            <Chart/>
           </CardBody>
         </Card>
       </Col>
     </Row> 
      </Container>
    </Fragment>
  );
};
export default index;