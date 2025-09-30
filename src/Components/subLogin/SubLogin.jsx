import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import { tableColumns,dummytabledata } from '../../Data/Table/Defaultdata'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import SubLoginForm from './SubLoginForm'
const SubLOgin = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Company' title='Manage SubLogin'/>
         <Container fluid={true}>
        <div className='bg-primary my-2 p-2'>
           <HeaderCard title="Add Sub-Login  " />
           </div>
           <SubLoginForm btnTtitle="Add Sub Login " />
           <div className='bg-primary my-2 p-2'>
                      <HeaderCard title="Sub-Login List  " />
          </div>
          <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
           </Container>
           </Fragment>
  )
}

export default SubLOgin
