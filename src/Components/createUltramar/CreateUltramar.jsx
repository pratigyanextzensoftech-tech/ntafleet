import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import {CreateUltramarTab} from '../../Data/tab/CreateUltramarTab'
const CreateUltramar = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Create Ultramar Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Create Single ULTRAMAR Invoice" />
            <BasicTabCard  tabContent={CreateUltramarTab}/>  
           </Container>
           </Fragment>
  )
}

export default CreateUltramar
