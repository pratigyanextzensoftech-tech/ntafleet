import React,{Fragment} from 'react'
import { Container } from 'reactstrap'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import { RetailInvoiceTab } from '../../Data/tab/RetailInvoice'
import HeaderCard from '../Common/Component/HeaderCard'
const RetailInvoice = () => {
  return (
      <Fragment>
             <Breadcrumbs parent='Invoice' title='Create Rack Invoice'/>
             <Container fluid={true}>
               <HeaderCard title="Create Single Rack Invoice (Capped)" />
                <BasicTabCard  tabContent={RetailInvoiceTab}/>  
               </Container>
               </Fragment>
  )
}

export default RetailInvoice
