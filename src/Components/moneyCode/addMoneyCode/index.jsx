import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import {Btn} from '../../../AbstractElements'
import AddMoneyCodeForm from './AddMoneyCodeForm'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Money Code' title=' Add MoneyCode '/>
         <Container fluid={true}>
           <HeaderCard title=" Add MoneyCode" />
                                          <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Add MoneyCode " />
                    </div>      
           <AddMoneyCodeForm btntitle="Add Money Code" />
                 </div>    
           </Container>
           </Fragment>
  )
}

export default index
