import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { ViewReportsTab } from '../../../Data/tab/ViewReportsTab'

const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Reports' title='view Reports'/>
         <Container fluid={true}>
           {/* <HeaderCard title="Report List" /> */}
           <div className="bg-primary p-2 my-3">
                      <HeaderCard title="Report List" />
                      </div>

            <BasicTabCard title="Reports list"  tabContent={ViewReportsTab}/>
           </Container>
           </Fragment>
  )
}

export default index
