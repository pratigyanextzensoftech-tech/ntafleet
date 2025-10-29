import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import {CreateCustomizedTab} from '../../Data/tab/CreateCustomizedTab'
const CreateCustomized = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Create Customized'/>
         <Container fluid={true}>
          <Row>
<Col sm="12">
<Card>
<HeaderCard title="Single Customised Invoice (US)" />
<CardBody>
<BasicTabCard  tabContent={CreateCustomizedTab}/> 
</CardBody>
</Card>
</Col>
</Row>
           </Container>
           </Fragment>
  )
}

export default CreateCustomized
