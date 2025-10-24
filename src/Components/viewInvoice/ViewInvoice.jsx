import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { Container,Row,Col,Card,CardBody } from "reactstrap";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard"; 

import BulkRetailInvoice from '../createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../createInvoice/SingleRetailMulti';
import OwnerOperator from '../viewInvoice/OwnerOperator';
import ViewInvoiceForm from '../viewInvoice/ViewInvoiceForm';
import CustomizedInvoice from '../viewInvoice/CustomizedInvoice';
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
 
const View_Invoice = [
  {
    id: '1',
    label: 'View Invoices',
    component: <ViewInvoiceForm  title="Filters"/>,
  },
  {
    id: '2',
    label: 'View Owner Operator Invoices',
    component: <OwnerOperator title="Filters" />,
  },
  {
    id: '3',
    label:'View Customised Invoices',
    component: <CustomizedInvoice title="Filters" />,
  },
  
];
const View_Invoice_Table = [
  {
    id: '1',
    label: 'View Invoices',
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>
,
  },
  {
    id: '2',
    label: 'View Owner Operator Invoices',
    component: <DataTableComponent title="Invoices List " tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label:'View Customised Invoices',
    component: <DataTableComponent title="Invoices List " tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];


const ViewInvoice = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="View Invoice" />
      <Container fluid={true}>

      <Row>
       <Col sm="12">
         <Card>
           <HeaderCard title="Invoice Filter" />
           <CardBody>
            <BasicTabCard tabContent={View_Invoice} />
           </CardBody>
         </Card>
       </Col>
     </Row>

     <Row>
       <Col sm="12">
         <Card>
           <HeaderCard title="Invoice Filter" />
           <CardBody>
            <BasicTabCard tabContent={View_Invoice_Table} />
           </CardBody>
         </Card>
       </Col>
     </Row>

 
      </Container>
    </Fragment>
  );
};

export default ViewInvoice;
