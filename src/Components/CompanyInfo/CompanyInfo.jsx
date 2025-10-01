import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import CompanyInfoForm from './CompanyInfoForm'
const CompanyInfo = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Company Info'/>
         <Container fluid={true}>
        <div className='bg-primary my-2 p-2'>
           <HeaderCard title="Company List " />
           </div>
           <CompanyInfoForm btnTtitle="Search Data" btnTtitle1="Reset"/>
          
          <DataTableComponent title="Company List "  tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default CompanyInfo
