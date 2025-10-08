import React from 'react'
import SupplierList from './SupplierList'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Breadcrumbs } from '../../../AbstractElements'
import { Container } from 'reactstrap'
const index = () => {
  return (
    <>
          <Breadcrumbs parent='Supplier' title='Manage Supplier'/>
                   <Container fluid={true}>

        <HeaderCard title="Add Supplier"/>
                                                      <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>
  <div className="bg-primary p-2 my-3">
                      <HeaderCard title="Add Supplier" />
                      </div>
      <SupplierList btntitle="Add Supplier" btnTitle1="Reset" />
     </div>
      <DataTableComponent title="Item List" tableData={dummytabledata} tableColumns={tableColumns}/>
               </Container>

    </>
  )
}

export default index
