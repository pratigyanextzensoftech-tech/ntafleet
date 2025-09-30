import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateReportTab } from '../../../Data/tab/CreateReportTab'
// import MoneyCodeList from '../../moneyCodeList/MoneyCodeListForm'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Reporting' title=' Create Report'/>
         <Container fluid={true}>
           <HeaderCard title=" Create Report" />
           <div className="bg-primary p-2 my-3">
                           <HeaderCard title=" Create Reports" />

                      </div>
                 <BasicTabCard title="Create Report" tabContent={CreateReportTab}/>


           </Container>
           </Fragment>
  )
}

export default index
