import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
export const View_Invoice_Table = [
  {
    id: '1',
    label: 'View Invoices',
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>
,
  },
  {
    id: '2',
    label: 'View Owner Operator Invoices',
    component: <DataTableComponent title="Invoices List " tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label:'View Customised Invoices',
    component: <DataTableComponent title="Invoices List " tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];