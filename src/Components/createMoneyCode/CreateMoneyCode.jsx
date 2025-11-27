import React, { Fragment } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateMoneyCodeTab } from '../../Data/tab/CreateMOneycodeTab'

const CreateMoneyCode = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='Create MoneyCode Invoice' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create MoneyCode Invoicey" />
              <CardBody>
                <BasicTabCard tabContent={CreateMoneyCodeTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
</Container>
    </Fragment>
  )
}

export default CreateMoneyCode
