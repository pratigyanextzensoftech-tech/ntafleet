import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import { View_Invoice_Table } from '../../Data/tab/ViewInvoiceTable'
import ViewMoneyCodeForm from './ViewMoneyCodeForm'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata'
const ViewMoneyCode = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='view MoneyCode'/>
         <Container fluid={true}>
           <HeaderCard title="MoneyCode Invoices List" />
           <ViewMoneyCodeForm/>
           <div className='bg-primary p-2'>
                      <HeaderCard  title="MoneyCode Invoices List" />
                      </div>
                      <DataTableComponent  tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default ViewMoneyCode
