import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import {CreateInvoiceDumyData} from '../../Data/tab/CreateInvoiceDumyData'
const CreateInvoice = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Create New Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Create Retail Invoice" />
            <BasicTabCard  tabContent={CreateInvoiceDumyData}/>  
           </Container>
           </Fragment>
  )
}

export default CreateInvoice
