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
                   <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

                <div className='bg-primary p-2 my-3'>
           <HeaderCard title="Check Invoices" />

                </div>
       
            {/* <BasicTabCard title="Filters"  tabContent={View_Invoice}/> */}
            <Form/>
          </div>
                       <DataTableComponent title="Invoices List" tableColumns={tableColumns} tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default CheckOldINvoice
