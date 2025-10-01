import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import OwnerOperator from '../../Components/viewInvoice/OwnerOperator';
import CustomizedInvoice from '../../Components/viewInvoice/CustomizedInvoice';
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
export const ManageGroupTable = [
  {
    id: '1',
    label: 'Group List',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
,
  },
  {
    id: '2',
    label: 'Group City List',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
 
  
];