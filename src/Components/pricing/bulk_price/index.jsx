import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { SinglepricingTableTab } from '../../../Data/tab/SinglePricingTableTab'
import { BulkPricingTab } from '../../../Data/tab/BulkPricingTab'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title=' Manage Bulk Pricing PDF'/>
         <Container fluid={true}>
           <HeaderCard title="Manage Bulk Pricing PDF" />
           
                 <BasicTabCard  tabContent={BulkPricingTab}/>
                             <div className='my-5'>

<DataTableComponent title="Pricing PDF List " tableData={dummytabledata} tableColumns={tableColumns}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
