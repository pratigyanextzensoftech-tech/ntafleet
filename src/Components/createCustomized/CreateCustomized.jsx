import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import {CreateCustomizedTab} from '../../Data/tab/CreateCustomizedTab'
const CreateCustomized = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Create Customized'/>
         <Container fluid={true}>
           <HeaderCard title="Single Customised Invoice (US)" />
            <BasicTabCard  tabContent={CreateCustomizedTab}/>  
           </Container>
           </Fragment>
  )
}

export default CreateCustomized
