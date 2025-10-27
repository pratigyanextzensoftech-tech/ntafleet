import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from '../Common/Component/HeaderCard'
import CompareForm from './CompareForm'
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
const index = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Compare Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Compare Invoice " />
                                          <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

           <div className='bg-primary p-2 my-3'>
                            <HeaderCard title="Filters " />
                    </div>
           <CompareForm btnTtitle="Search Data" btnTtitle1="Reset"/>
           </div>
          <DataTableComponent title="Compare Invoice List" tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default index
