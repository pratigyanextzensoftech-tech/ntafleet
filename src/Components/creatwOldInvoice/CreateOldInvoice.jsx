import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateOldInvoiceTab } from '../../Data/tab/CreateOldInvoiceTab'
const CreateOldInvoice = () => {
  return (
   <Fragment>
         <Breadcrumbs parent='Invoice' title='Create Old Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Create Old Rack  Invoice" />
            <BasicTabCard  tabContent={CreateOldInvoiceTab}/>  
           </Container>
           </Fragment>
  )
}

export default CreateOldInvoice
