import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container} from 'reactstrap'
import EssoFtpLive from './EssoFtpLiveForm'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title=' ESSO FTP To Live Transactions'/>
         <Container fluid={true}>
           <HeaderCard title=" ESSO FTP To Live Transactions" />
                               <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Copy ESSO FTP To Live Transactions" />

                      </div>
<EssoFtpLive btnTitle="Copy Data"/>
</div>
           </Container>
           </Fragment>
  )
}

export default index
