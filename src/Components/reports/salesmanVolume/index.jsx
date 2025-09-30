import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import SalesmanVol from './SalesmanVol'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Reports' title='Salesman Volume Report'/>
         <Container fluid={true}>
           <HeaderCard title="Manage Salesman Report" />
           <div className="bg-primary p-2 my-3">
                      <HeaderCard title="Create Salesman Report" />
                      </div>
                <SalesmanVol btnTitle="Create Volume Report"/>
                 <div className="bg-primary p-2 my-3">
                      <HeaderCard title="Salesman Report List " />
                      </div>
                      <DataTableComponent  tableColumns={tableColumns}  tableData={dummytabledata}/>

           </Container>
           </Fragment>
  )
}

export default index
