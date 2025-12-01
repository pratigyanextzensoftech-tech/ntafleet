import RetailToRack from '../../Components/transaction/retailToRack/RetailToRack';

export const RetailToRackTab = [
  {
    id: '1',
    label:  (
      <>
       TA - <strong>[Capped]</strong>
      </>
    ),
    component: <RetailToRack  invoice_type="Capped" country_id="" company_list="checkbox"  supplier_ids="3" btnTtitle="Update Rack Transaction" title="Create Single Rack Invoice (Capped)"/>,
  },
  {
    id: '2',
    label: (
      <>
       TA  - <strong>[Actual]</strong>
      </>
    ),
    component: <RetailToRack  invoice_type= "Actual" country_id="" company_list="checkbox"  supplier_ids="3" btnTtitle="Update Rack Transaction" title="Create Single Rack Invoice (Capped)"/>,
  },
  
  {
    id: '3',
     label: "Esso",
    component: <RetailToRack country_id="1"  invoice_type_dropdown={true}  supplier_ids="6"  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
  },
   {
    id: '4',
    label:"ESSO Owner Operator",
    component: <RetailToRack country_id="1" invoice_type="RG" invoice_type_dropdown={true}  supplier_ids="6"  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
  },
 
  
   {
    id: '5',
    label: (
      <>
       Love - <strong>[Capped ]</strong>
      </>
    ),
    component: <RetailToRack invoice_type="Capped" country_id="" company_list="checkbox"  supplier_ids="7" type="loves" btnTtitle="Create Rack Transaction" title="Update Single Rack Invoice (Capped)"/>,
  },
   {
    id: '6',
    label: (
      <>
      Love - <strong>[Actual]</strong>
      </>
    ),
    component: <RetailToRack  invoice_type= "Actual" country_id="" company_list="checkbox"   supplier_ids="7" type="loves" btnTtitle="Create Rack Transaction" title="Update Single Rack Invoice (Capped)"/>,
  },
    {
    id: '7',
    label:"ULTRAMAR",
    component: <RetailToRack country_id="1" company_list="checkbox"  invoice_type_dropdown={true}  supplier_ids="10" type="ultramar"  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
  },
   {
    id: '8',
    label:"Ultramar Owner Operator",
    component: <RetailToRack country_id="1"  invoice_type="RG" invoice_type_dropdown={true}     supplier_ids="10" type="ultramar"  title="Create Single Rack Invoice (Actual)" btnTtitle="Update Transaction"/>,
 
  },
  {
    id: '9',
    label:"Linamar Price Update",
    component: <RetailToRack country_id="" countryDropDown={false}   supplier_ids="6,4"  title="Linamar Price Update"  btnTtitle="Update Transaction"/>,
  },
];
