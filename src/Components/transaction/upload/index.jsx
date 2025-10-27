import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { upload_transaction_tab } from '../../../Data/tab/UploadTransactionTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title='Upload Petro Canada Transactions'/>
         <Container fluid={true}>
           <HeaderCard title="View Invoice" />
            <BasicTabCard   tabContent={upload_transaction_tab}/>
          
           </Container>
           </Fragment>
  )
}

export default index
