
export const SendBulkTab = [
  {
    id: '1',
    label:"Send Invoice",
    component: <SingleEssoForm btnTtitle="Search Invoice" title="Search Invoice"/>,
  },
  {
    id: '2',
    label:"Send Owner Operator Invoice",
    component: <BulkRetailInvoice btnTtitle="Search Data" btn1Title="Reset"  title="Search Owner Operator Invoice"/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component: <SingleEssoForm btnTtitle="Search Data" title="Search MoneyCode Invoice"/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:  <BulkRetailInvoice btnTtitle="Search Data" btn1Title="Reset"  title="Search Customized Invoice"/>,
  },
 
  
   {
    id: '5',
    label:"Send T-check Invoice",
    component: <SingleEssoForm btnTtitle="Search Data" title="Search T-check Invoice"/>,
  },
  
];
