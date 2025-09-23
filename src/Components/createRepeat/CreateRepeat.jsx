import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import { Container } from 'reactstrap'
import HeaderCard from '../Common/Component/HeaderCard'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import {CreateRepeatTab} from '../../Data/tab/CreateRepeatRetail'
const CreateRepeat = () => {
  return (
    <Fragment>
         <Breadcrumbs parent='Invoice' title='Create Repeat Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Create Repeat Retail Invoice" />
            <BasicTabCard  tabContent={CreateRepeatTab}/>  
           </Container>
           </Fragment>
  )
}

export default CreateRepeat
