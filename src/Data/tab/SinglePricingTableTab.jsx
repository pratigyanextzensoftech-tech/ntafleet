
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import { dummytabledata,tableColumns } from '../Table/Defaultdata';
export const SinglepricingTableTab = [
  {
    id: '1',
    label:"Flying J Pdf"  , 
    component: <DataTableComponent title="Flying J Pricing PDF List  "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Ta-Petro Pdf  - <strong> [Capped]</strong>
      </>
    ), 
    component:<DataTableComponent title="Ta-Petro Pricing PDF List (Capped)  "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Ta-Petro Pdf - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <DataTableComponent title="Ta-Petro Pricing PDF List (Actual)  "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
 {
    id: '4',
    label:" Esso Pdf (without Text) ", 
    component: <DataTableComponent title="ESSO Pricing PDF List (Without Tax) "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
   {
    id: '5',
   label:" Esso Pdf (with Text) ", 
    component: <DataTableComponent title="ESSO Pricing PDF List (With Tax) "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
   {
    id: '6',
    label: 
     (
      <>
       Love Pdf  - <strong> [Capped]</strong>
      </>
    ), 
    component: <DataTableComponent title="LOVE Pricing PDF List (Capped) "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  {
    id: '7',
    label: 
     (
      <>
       Love Pdf  - <strong> [Actual]</strong>
      </>
    ), 
    component: <DataTableComponent title="LOVE Pricing PDF List (Actual)"  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
   {
    id: '8',
    label: "Ultramar Pdf",
    
    component: <DataTableComponent title="ULTRAMAR Pricing PDF List  "  tableColumns={tableColumns}  tableData={dummytabledata}/>,
  },
  
];