
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import AddUpdateLocForm from '../../Components/location/manageLoc/AddUpdateLocForm';
export const ManageLocTable = [
  {
    id: '1',
    label: 'Flying J location',
    component: <DataTableComponent title="Flying J Location List " tableColumns={tableColumns}  tableData={dummytabledata}/>
,
  },
  {
    id: '2',
    label: 'Ta Petro Location',
    component: <DataTableComponent title="Ta Petro Location List" tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label:'Esso Location',
    component: <DataTableComponent title="Esso Location List" tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '4',
    label:'Love Location',
    component: <DataTableComponent  title="Love Location List"  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '5',
    label:'Add/Update Location',
    component: <AddUpdateLocForm />,
  },
  
];