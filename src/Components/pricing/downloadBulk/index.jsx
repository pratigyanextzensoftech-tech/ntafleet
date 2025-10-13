import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { pricingListTableTab } from '../../../Data/tab/PricingListTableTab'
import { DownloadBulkTab } from '../../../Data/tab/DownloadBulkTab'
import { DownloadBulkTableTab } from '../../../Data/tab/DownloadBulkTableTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Download Bulk Price Sheet'/>
         <Container fluid={true}>
           <HeaderCard title="Download Bulk Price Sheet" />
           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Download Bulk Price Sheet" />
                      </div>
                 <BasicTabCard  tabContent={DownloadBulkTab}/>
                             <div className='my-5'>

                                  <BasicTabCard  tabContent={DownloadBulkTableTab}/>
             </div>
           </Container>
           </Fragment>
  )
}

export default index
