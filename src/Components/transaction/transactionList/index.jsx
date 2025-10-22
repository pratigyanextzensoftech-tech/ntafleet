import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container} from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import TransactionList from './TransactionList'

const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title=' ESSO FTP Transactions List'/>
         <Container fluid={true}>
           <HeaderCard title=" ESSO FTP Transactions List" />
                               <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Filters" />
                      </div>
<TransactionList btnTitle="Search Data" btnTitle1="Reset"/>
</div>
<DataTableComponent title="Esso FTP Transactions List" tableData={dummytabledata} tableColumns={tableColumns}/>
           </Container>
           </Fragment>
  )
}

export default index
