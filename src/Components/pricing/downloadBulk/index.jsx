import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col ,Card,CardBody} from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { pricingListTableTab } from "../../../Data/tab/PricingListTableTab";
import { DownloadBulkTab } from "./DownloadBulkTab";
import { DownloadBulkTableTab } from "../../../Data/tab/DownloadBulkTableTab";
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Download Bulk Price Sheet" />
      <Container fluid={true}>

        <Row>
  <Col sm="12">
  <Card>
    <HeaderCard title="Download Bulk Price Sheet" />
    <CardBody>
      	<BasicTabCard tabContent={DownloadBulkTab} />
    </CardBody>
  </Card>
  </Col>
</Row>

<Row>
  <Col sm="12">
  <Card>
    <HeaderCard title="Download Bulk Price Sheet" />
    <CardBody>
      	<BasicTabCard tabContent={DownloadBulkTableTab} />
    </CardBody>
  </Card>
  </Col>
</Row>
 
      </Container>
    </Fragment>
  );
};

export default index;
