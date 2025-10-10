import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
import { dummytabledata,tableColumns } from "../Table/Defaultdata";
export const pricingListTableTab = [
  {
    id: '1',
    label:"Flying J"  , 
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Ta-Petro  - <strong> [Capped]</strong>
      </>
    ), 
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Ta-Petro  - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
 {
    id: '4',
    label:" Esso ", 
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
   {
    id: '5',
    label:  (
      <>
      Love  - <strong> [Capped]</strong>
      </>
    )
   ,
    component:<DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/> ,
  },
   {
    id: '6',
    label: 
     (
      <>
       Love  - <strong> [Actual]</strong>
      </>
    ), 
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
   {
    id: '7',
    label: "Ultramar",
    
    component: <DataTableComponent title="Invoices List "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];