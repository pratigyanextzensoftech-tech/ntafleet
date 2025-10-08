import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col } from 'reactstrap'

import UpdateUnitForm from './UpdateUnitForm'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title=' Update Unit / Driver'/>
         <Container fluid={true}>
           <HeaderCard title=" Update Unit / Driver" />
                               <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Update Unit / Driver" />

                      </div>
<UpdateUnitForm btnTitle="Search Data" />
</div>
           </Container>
           
           </Fragment>
  )
}

export default index
