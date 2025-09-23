import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import {EssoInvoiceTab} from '../../Data/tab/CreateEssoTab'
const CreateEssoInvoice = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Create Esso Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Create Retail Invoice" />
            <BasicTabCard  tabContent={EssoInvoiceTab}/>  
           </Container>
           </Fragment>
  )
}

export default CreateEssoInvoice
