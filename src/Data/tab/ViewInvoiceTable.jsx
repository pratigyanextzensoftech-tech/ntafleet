import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import OwnerOperator from '../../Components/viewInvoice/OwnerOperator';
import CustomizedInvoice from '../../Components/viewInvoice/CustomizedInvoice';
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
export const View_Invoice_Table = [
  {
    id: '1',
    label: 'View Invoices',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>
,
  },
  {
    id: '2',
    label: 'View Owner Operator Invoices',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label:'View Customised Invoices',
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];