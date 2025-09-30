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
      <SupplierList btntitle="Add Supplier" btnTitle1="Reset" />
      <div className='my-5 p-2 bg-primary'>
              <HeaderCard title="Item List"/>
</div>
      <DataTableComponent tableData={dummytabledata} tableColumns={tableColumns}/>
               </Container>

    </>
  )
}

export default index
