import React, { Fragment, useState } from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns, dummytabledata } from '../../../Data/Table/Defaultdata'
import MoneyCodeList from '../moneyCodeList/MoneyCodeListForm'
const index = () => {
const handleSearch=()=>{
     
}
     return (
          <Fragment>
               <Breadcrumbs parent='Money Code' title=' Check MoneyCode' />
               <Container fluid={true}> 
                    <Row>
                         <Col sm="12">
                              <Card>
                                   <HeaderCard title="Filters" />
                                   <CardBody>
                                        <MoneyCodeList btntitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
                                   </CardBody>
                              </Card>
                         </Col>
                    </Row>

                    <Row>
                         <Col sm="6">
                              <Card>
                                   <HeaderCard title="All MoneyCode List" />
                                   <CardBody>
                                      <DataTableComponent tableColumns={tableColumns} tableData={dummytabledata} />
                                   </CardBody>
                              </Card>
                         </Col>
                         <Col sm="6">
                              <Card>
                                   <HeaderCard title="Invoiced MoneyCode List" />
                                   <CardBody>
                                         <DataTableComponent tableColumns={tableColumns} tableData={dummytabledata} />
                                   </CardBody>
                              </Card>
                         </Col>

                          <Col sm="12">
                              <Card>
                                   <HeaderCard title="Missing MoneyCode List" downloadHeading="Download" download={true}/>
                                   <CardBody>
                                         <DataTableComponent tableColumns={tableColumns} tableData={dummytabledata} />
                                   </CardBody>
                              </Card>
                         </Col>
                    </Row>



                  
                   

               </Container>
          </Fragment>
     )
}

export default index
