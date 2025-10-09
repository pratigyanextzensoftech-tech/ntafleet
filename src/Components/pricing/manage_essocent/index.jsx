import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import Manage_EssoCent from './Manage_EssoCent'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Manage Esso Cent Type'/>
         <Container fluid={true}>
           <HeaderCard title="Manage Esso Cent Type" />
                                              <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                      <HeaderCard title="Add Esso Cent Type " />
                      </div>
                <Manage_EssoCent btnTitle="Add Esso Cent Type"/>
                 </div>
                      <DataTableComponent  title="Manage Esso Cent Type List   " tableColumns={tableColumns}  tableData={dummytabledata}/>

           </Container>
           </Fragment>
  )
}

export default index
