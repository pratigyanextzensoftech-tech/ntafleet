import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { RetailToRackTab } from '../../../Data/tab/RetailToRackTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title='TA-Petro Retail To Rack(Capped)'/>
         <Container fluid={true}>
                                           <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>
<div className="bg-primary p-2 my-3">
           <HeaderCard title="TA-Petro Retail To Rack(Capped)" />

                      </div>
            <BasicTabCard   tabContent={RetailToRackTab}/>
          </div>
           </Container>
           </Fragment>
  )
}

export default index
