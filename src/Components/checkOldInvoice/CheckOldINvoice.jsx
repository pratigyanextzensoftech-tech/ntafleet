import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements';
import HeaderCard from '../Common/Component/HeaderCard';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { Container,Card,CardBody } from 'reactstrap';
import Form from './CheckInvoiceForm';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { dummytabledata,tableColumns } from '../../Data/Table/checkInvoiceTableData';
const CheckOldINvoice = () => {
  return (
   <Fragment>
         <Breadcrumbs parent='Invoice' title='check old Invoices'/>
         <Container fluid={true}>

           <HeaderCard title="Check Invoices" />
           <Card className="shadow-lg">
            <CardBody>
            {/* <BasicTabCard title="Filters"  tabContent={View_Invoice}/> */}
            <Form/>
            </CardBody>
           </Card>
                       <HeaderCard title="Invoices List" />
                       <DataTableComponent tableColumns={tableColumns} tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default CheckOldINvoice
