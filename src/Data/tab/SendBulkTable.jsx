
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
export const SendBulkTable = [
  {
    id: '1',
    label:"Send Invoice",
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '2',
    label:"Sender Owner Operator Invoice",
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component:<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component: <DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
 
  
   {
    id: '5',
    label:"Send T-check Invoice",
    component:<DataTableComponent tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];
