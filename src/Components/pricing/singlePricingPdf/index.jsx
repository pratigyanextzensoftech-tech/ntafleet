import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { SinglepricingTableTab } from '../../../Data/tab/SinglePricingTableTab'
import {SinglepricingTab} from '../../../Data/tab/SinglePricingTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title=' Flying J Pricing List'/>
         <Container fluid={true}>
           <HeaderCard title=" Flying J Pricing List" />
           
                 <BasicTabCard  tabContent={SinglepricingTab}/>
                             <div className='my-5'>

                                  <BasicTabCard  tabContent={SinglepricingTableTab}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
