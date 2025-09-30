import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
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
          
           <AddMoneyCodeForm btntitle="Add Money Code" />
                     
           </Container>
           </Fragment>
  )
}

export default index
