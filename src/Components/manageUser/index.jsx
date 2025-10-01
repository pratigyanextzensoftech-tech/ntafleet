import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import FormComponent from './Form'
import { Container } from 'reactstrap';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { tableColumns } from '../../Data/Table/Defaultdata';
import { dummytabledata } from '../../Data/Table/Defaultdata';
const index = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='user login' title='user login'  />
      <Container fluid={true}>
       
            <FormComponent />
            {/* <BasicInputCard2 /> */}
                      <DataTableComponent title="User List"  tableColumns={tableColumns}  tableData={dummytabledata}/>

      </Container>
    </Fragment>
  );
};

export default index;