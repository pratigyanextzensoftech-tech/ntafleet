import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateRepeatTab } from '../../Data/tab/CreateRepeatRetail'
const CreateRepeat = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Create Repeat Invoice' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Repeat Retail Invoice" />
              <CardBody>
                <BasicTabCard tabContent={CreateRepeatTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  )
}

export default CreateRepeat
