import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container,Row,Col} from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import TransactionList from '../transactionList/TransactionList'
import CheckTransaction from './CheckTransaction'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Transaction' title=' Check Transactions'/>
         <Container fluid={true}>
           <HeaderCard title="Check Transactions" />
                               <div style={{border:"1px solid #ccc",padding:"5px 10px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className="bg-primary p-2 my-3">
                           <HeaderCard title="Filters" />

                      </div>
<CheckTransaction btnTitle="Search Data" btnTitle1="Reset"/>
</div>
<Row>
    <Col sm="6">
    <DataTableComponent title="All Transactions List" tableData={dummytabledata} tableColumns={tableColumns}/>
    </Col>
    <Col sm="6">
        <DataTableComponent title="Invoiced Transactions List " tableData={dummytabledata} tableColumns={tableColumns}/>

    </Col>
</Row>
<Row className='mt-3'>
    <DataTableComponent title="Missing Transactions List " tableData={dummytabledata} tableColumns={tableColumns}/>
    </Row>
           </Container>
           </Fragment>
  )
}

export default index
