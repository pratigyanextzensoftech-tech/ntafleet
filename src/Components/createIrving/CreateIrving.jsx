import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateIrvingTab } from '../../Data/tab/CreateIrving'
const CreateIrving = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Create Irving Invoice' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Single Irving Invoice" />
              <CardBody>
                <BasicTabCard tabContent={CreateIrvingTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  )
}

export default CreateIrving
