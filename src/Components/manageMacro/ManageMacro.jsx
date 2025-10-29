import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { Container, Row, Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMacroTab } from '../../Data/tab/ManageMacroTab';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../Data/Table/Defaultdata';
const ManageMacro = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Manage Macro' title='Upload US Transaction' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Upload US Transaction" />
              <CardBody>
                <BasicTabCard tabContent={ManageMacroTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent title="Transaction List" tableColumns={tableColumns} tableData={dummytabledata} />

      </Container>
    </Fragment>
  );
};

export default ManageMacro;