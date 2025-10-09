import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import DownloadEssoCentForm from './DownloadEssoCentForm'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Pricing' title='Download ESSO Cent'/>
         <Container fluid={true}>
           <HeaderCard title="Download ESSO Cent" />
                                              <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                      <HeaderCard title="Download ESSO Cent" />
                      </div>
                <DownloadEssoCentForm btnTitle="Search"/>
                 </div>
                      <DataTableComponent  title="ESSO Cent List  " tableColumns={tableColumns}  tableData={dummytabledata}/>

           </Container>
           </Fragment>
  )
}

export default index
