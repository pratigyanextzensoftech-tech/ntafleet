import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata'
import { UltramarBulkTab } from '../../../Data/tab/UltramarBulkTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Manage ULTRAMAR Bulk Pricing PDF (Without Tax)'/>
         <Container fluid={true}>
           <HeaderCard title="Manage ULTRAMAR Bulk Pricing PDF (Without Tax)" />
                 <BasicTabCard  tabContent={UltramarBulkTab}/>
             <div className='my-5'>
                <DataTableComponent title="Pricing PDF List" tableData={dummytabledata} tableColumns={tableColumns}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
