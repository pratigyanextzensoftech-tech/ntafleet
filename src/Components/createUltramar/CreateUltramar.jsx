import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateUltramarTab } from '../../Data/tab/CreateUltramarTab'
const CreateUltramar = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Create Ultramar Invoice' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Single ULTRAMAR Invoice" />
              <CardBody>
                <BasicTabCard tabContent={CreateUltramarTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  )
}

export default CreateUltramar
