import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { TaPetroRackTab } from '../../../Data/tab/TaPetroRackTab'
const index = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update Ta-Petro Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title=" Multiple Ta-Petro Rack Cent Entry" />
                 <BasicTabCard  tabContent={TaPetroRackTab}/>
           </Container>
           </Fragment>
  )
}
export default index
