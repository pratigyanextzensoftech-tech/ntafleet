import React,{Fragment} from 'react'
import { Container } from 'reactstrap'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import { SendBulkTab } from '../../Data/tab/SendBulkTab'
import HeaderCard from '../Common/Component/HeaderCard'
const SendBulk = () => {
  return (
      <Fragment>
             <Breadcrumbs parent='Invoice' title='SendBulk Invoice'/>
             <Container fluid={true}>
               <HeaderCard title="Send Invoice" />
                <BasicTabCard  tabContent={SendBulkTab}/>  
               </Container>
               </Fragment>
  )
}

export default SendBulk
