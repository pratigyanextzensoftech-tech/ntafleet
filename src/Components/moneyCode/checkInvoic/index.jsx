import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import MoneyCodeList from '../moneyCodeList/MoneyCodeListForm'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Money Code' title=' Check MoneyCode'/>
         <Container fluid={true}>
           <HeaderCard title=" Check MoneyCode" />
           <div className="bg-primary p-2 my-3">
                           <HeaderCard title=" Filters" />

                      </div>
           <MoneyCodeList btntitle="Search Data" btnTitle1="Reset" />
                     <Row>
                      <Col sm="6">
                      <div className="bg-primary p-2 my-3">
                           <HeaderCard title="All MoneyCode List" />

                      </div>
  <DataTableComponent  tableColumns={tableColumns}  tableData={dummytabledata}/>
                      </Col>
                                            <Col sm="6">
                                             <div className="bg-primary p-2 my-3">
                           <HeaderCard title=" Invoiced MoneyCode List" />

                      </div>

  <DataTableComponent  tableColumns={tableColumns}  tableData={dummytabledata}/>
                                            </Col>

                     </Row>
                       <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Missing MoneyCode List " />

                      </div>
                       <DataTableComponent  tableColumns={tableColumns}  tableData={dummytabledata}/>

           </Container>
           </Fragment>
  )
}

export default index
