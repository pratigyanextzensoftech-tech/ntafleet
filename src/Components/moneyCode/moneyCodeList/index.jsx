import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import MoneyCodeListForm from './MoneyCodeListForm'
import {Btn} from '../../../AbstractElements'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Money Code' title='MoneyCode List'/>
         <Container fluid={true}>
           <HeaderCard title="MoneyCode List" />
            <div className='bg-primary p-2 my-2'>
                      <HeaderCard  title="Filters" />
                      </div>
           <MoneyCodeListForm btntitle="Search Data" btnTitle1="Reset"/>
           <div className='bg-primary p-2 mt-5 mb-3'>
                      <HeaderCard  title="MoneyCode  List" />
                      </div>
             <div className='text-end'>
                            <Btn attrBtn={{ color: "secondary", className: "m-r-15",  }} >Download Money Code</Btn>

                        </div>         
                      <DataTableComponent  tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default index
