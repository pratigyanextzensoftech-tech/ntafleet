import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
import { tableColumns } from "../Table/Defaultdata";
import { dummytabledata } from "../Table/Defaultdata";
export const LocPetroLinkTable = [
  {
    id: '1',
    label: 'Esso Petro Link List',
    component:<DataTableComponent title="Group List "  tableColumns={tableColumns}  tableData={dummytabledata}/> ,
  },
  {
    id: '2',
    label: 'Ultramar Petro Link List',
    component:<DataTableComponent title="Group City List  "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
];