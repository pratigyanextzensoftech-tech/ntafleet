import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { UltramarGroupTab } from '../../../Data/tab/UltramrGroupTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update ULTRAMAR Group Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title="Update ULTRAMAR Group Rack Cent" />
                 <BasicTabCard  tabContent={UltramarGroupTab}/>
           </Container>
           </Fragment>
  )
}

export default index
