import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { UpdateLoveRackTab } from '../../../Data/tab/UpdateLoveRackCentTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update Love Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title="Multiple Love Rack Cent " />
                 <BasicTabCard  tabContent={UpdateLoveRackTab}/>
           </Container>
           </Fragment>
  )
}

export default index
