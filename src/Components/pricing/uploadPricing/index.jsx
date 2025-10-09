import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateReportTab } from '../../../Data/tab/CreateReportTab'
import { UploadFjPricingTab } from '../../../Data/tab/UploadFjPricingTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title=' Upload FJ Pricing'/>
         <Container fluid={true}>
           <HeaderCard title=" Upload FJ Pricing" />
           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Upload FJ Pricing" />

                      </div>
                 <BasicTabCard  tabContent={UploadFjPricingTab}/>


           </Container>
           </Fragment>
  )
}

export default index
