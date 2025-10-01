import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import CompareForm from './CompareForm'
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
const index = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Compare Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Compare Invoice " />
           <CompareForm btnTtitle="Search Data" btnTtitle1="Reset"/>
           
          <DataTableComponent title="Compare Invoice List" tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default index
