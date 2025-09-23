import React,{Fragment} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container } from 'reactstrap'
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { CreateMoneyCodeTab } from '../../Data/tab/CreateMOneycodeTab'
const CreateMoneyCode = () => {
  return (
   <Fragment>
         <Breadcrumbs parent='Invoice' title='Create MoneyCode Invoice'/>
         <Container fluid={true}>
           <HeaderCard title="Create MoneyCode Invoice" />
            <BasicTabCard  tabContent={CreateMoneyCodeTab}/>  

           </Container>
           </Fragment>
  )
}

export default CreateMoneyCode
