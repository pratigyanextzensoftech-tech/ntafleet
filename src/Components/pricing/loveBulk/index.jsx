import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { SinglepricingTableTab } from '../../../Data/tab/SinglePricingTableTab'
import { BulkPricingTab } from '../../../Data/tab/BulkPricingTab'
import { TaPetroTab } from '../../../Data/tab/TaPetroTab'
import {LovePricingTab} from '../../../Data/tab/LovePricingTab'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Manage LOVE Bulk Pricing PDF'/>
         <Container fluid={true}>
           <HeaderCard title="Manage LOVE Bulk Pricing PDF" />
           
                 <BasicTabCard  tabContent={LovePricingTab}/>
                             <div className='my-5'>

<DataTableComponent title="Pricing PDF List " tableData={dummytabledata} tableColumns={tableColumns}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
