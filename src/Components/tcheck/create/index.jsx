import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Create from './Create';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='Create T-Check Invoice '  />
      <Container fluid={true}>
                   <HeaderCard title="Create T-Check Invoice " />
                    <div className='bg-primary p-2 mb-4'>
                            <HeaderCard title="Create T-Check Invoice " />
                    </div>      
                 <Create btnTitle="Create T-check Invoice"/>   
                
      </Container>
    </Fragment>
  );
};

export default index;