import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { RackToRetailTab } from '../../../Data/tab/RackToRetailTab'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title='FJ Rack To Retail Transaction'/>
         <Container fluid={true}>
                                           <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>
<div className="bg-primary p-2 my-3">
           <HeaderCard title="FJ Rack To Retail Transaction" />

                      </div>
            <BasicTabCard   tabContent={RackToRetailTab}/>
          </div>
           </Container>
           </Fragment>
  )
}

export default index
