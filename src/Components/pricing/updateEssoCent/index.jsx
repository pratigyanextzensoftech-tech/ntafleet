import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import UpdateEssocent from './UpdateEssoCent'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Update ESSO Group Rack Cent'/>
         <Container fluid={true}>
           <HeaderCard title="Update ESSO Group Rack Cent" />
                                              <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                      <HeaderCard title="ESSO Group Rack Entry" />
                      </div>
                <UpdateEssocent btnTitle="Search Group"/>
                 </div>
           </Container>
           </Fragment>
  )
}

export default index
