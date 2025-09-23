import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { View_Invoice_Table } from '../../Data/tab/ViewInvoiceTable'
import { View_Invoice } from '../../Data/tab/ViewInvoice'

const ViewInvoice = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='view Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="View Invoice" />
            <BasicTabCard title="Filters"  tabContent={View_Invoice}/>
            <div className='my-5'>
            <BasicTabCard title="Invoices List "  tabContent={View_Invoice_Table}/>
</div>
           </Container>
           </Fragment>
  )
}

export default ViewInvoice
