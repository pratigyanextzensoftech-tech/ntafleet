import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { Container, Row, Col } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMacroTab } from '../../Data/tab/ManageMacroTab';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../Data/Table/Defaultdata';
const ManageMacro = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Manage Macro' title='Upload US Transaction'  />
      <Container fluid={true}>
                   <HeaderCard title="Upload US Transaction" />
       
                <BasicTabCard tabContent={ManageMacroTab}/>
                <div className='bg-primary p-2 my-5'>
                            <HeaderCard title="Transaction List" />
                 </div>           
<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
      </Container>
    </Fragment>
  );
};

export default ManageMacro;