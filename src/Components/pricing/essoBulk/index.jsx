import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { EssoBulkTab } from '../../../Data/tab/EssoBulkTab'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Manage ESSO Bulk Pricing PDF (Without Tax)'/>
         <Container fluid={true}>
           <HeaderCard title="Manage ESSO Bulk Pricing PDF (Without Tax)" />
           
                 <BasicTabCard  tabContent={EssoBulkTab}/>
                             <div className='my-5'>

<DataTableComponent title="Pricing PDF List (Without Tax) " tableData={dummytabledata} tableColumns={tableColumns}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
