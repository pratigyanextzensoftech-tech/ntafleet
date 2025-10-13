import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { EssoGroupRackTab } from '../../../Data/tab/EssoGroupRackTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update ESSO Group Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title="Update ESSO Group Rack Cent" />
           
                 <BasicTabCard  tabContent={EssoGroupRackTab}/>
                             <div className='my-5'>

             </div>
           </Container>
           </Fragment>
  )
}

export default index
