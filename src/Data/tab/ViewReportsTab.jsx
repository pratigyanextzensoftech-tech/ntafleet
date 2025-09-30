import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import OwnerOperator from '../../Components/viewInvoice/OwnerOperator';
import CustomizedInvoice from '../../Components/viewInvoice/CustomizedInvoice';
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
export const ViewReportsTab = [
  {
    id: '1',
    label: 'Report List',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
,
  },
  {
    id: '2',
    label: ' Owner Operator Report List',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label:'Old Report List',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];