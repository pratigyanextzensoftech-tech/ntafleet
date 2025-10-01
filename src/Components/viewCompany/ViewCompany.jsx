import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata'
const ViewCompany = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Company List'/>
         <Container fluid={true}>
           <HeaderCard title=" Company List" />
          
                      <DataTableComponent  title="Company List"  tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default ViewCompany
