import { tableColumns } from "../Table/Defaultdata";
import { dummytabledata } from "../Table/Defaultdata";
import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
export const ManageMenuTable = [
  {
    id: '1',
    label: 'Primary Menu',
    component:<DataTableComponent title="Primary Menu List "  tableColumns={tableColumns}  tableData={dummytabledata}/>
 ,
  },
  {
    id: '2',
    label: 'Secondary Menu',
    component:<DataTableComponent title="Secondary Primary List"  tableColumns={tableColumns}  tableData={dummytabledata}/>
 ,
  },
];