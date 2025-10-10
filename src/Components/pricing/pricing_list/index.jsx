import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { pricingListTableTab } from '../../../Data/tab/PricingListTableTab'
import {pricingListTab} from '../../../Data/tab/PricingListTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title=' Flying J Pricing List'/>
         <Container fluid={true}>
           <HeaderCard title=" Flying J Pricing List" />
           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Flying J Pricing List" />
                      </div>
                 <BasicTabCard  tabContent={pricingListTab}/>
                             <div className='my-5'>

                                  <BasicTabCard  tabContent={pricingListTableTab}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
