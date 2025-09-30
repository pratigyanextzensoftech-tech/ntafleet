import React,{Fragment,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import UploadForm from './UploadForm'
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import { tableColumns,dummytabledata } from '../../../Data/Table/Defaultdata'
import {Btn} from '../../../AbstractElements'
const index = () => {
  
  return (
    <Fragment>
         <Breadcrumbs parent='Money Code' title='Upload Money Code '/>
         <Container fluid={true}>

           <div className='bg-primary p-2 mt-5 mb-3'>
                      <HeaderCard  title="MoneyCode  List" />
                      </div>
                  <UploadForm btntitle="Upload Money Code" />
           </Container>
           </Fragment>
  )
}

export default index
