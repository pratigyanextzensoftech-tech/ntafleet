import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { OwnerOperatorRackTab } from '../../../Data/tab/OwnerOperatorRackTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update ESSO Owner Operator Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title=" Multiple Owner Operator Rack Cent EntryRackTab"/>
             <BasicTabCard  tabContent={OwnerOperatorRackTab}/>
           </Container>
           </Fragment>
  )
}

export default index
