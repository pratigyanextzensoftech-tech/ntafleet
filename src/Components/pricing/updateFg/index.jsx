import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { FgRack } from '../../../Data/tab/FgRackTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update FG Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title="Update FG Rack Cent" />
                 <BasicTabCard  tabContent={FgRack}/>
           </Container>
           </Fragment>
  )
}

export default index
