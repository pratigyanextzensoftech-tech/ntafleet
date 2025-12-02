import RetailToRack from '../../Components/transaction/retailToRack/RetailToRack';
import { retail_to_rack_Api } from '../../api';
export const RetailToRackTab = [
  {
    id: '1',
    label: <>TA - <strong>[Capped]</strong></>,
    component: () => (
      <RetailToRack 
        invoice_type="Capped" 
        company_list="checkbox"
        supplier_ids="3"
        btnTtitle="Update Rack Transaction"
        title="Create Single Rack Invoice (Capped)"
        api_name={retail_to_rack_Api}

      />
    ),
  },
  {
    id: '2',
    label: <>TA - <strong>[Actual]</strong></>,
    component: () => (
      <RetailToRack
        invoice_type="Actual"
        company_list="checkbox"
        supplier_ids="3"
        btnTtitle="Update Rack Transaction"
        title="Create Single Rack Invoice (Actual)"
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '3',
    label: "Esso",
    component: () => (
      <RetailToRack
        invoice_type=""
        supplier_ids="6"
        invoice_type_dropdown={true}
        title="Create Single Rack Invoice (Actual)"
        btnTtitle="Search Company"
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '4',
    label: "ESSO Owner Operator",
    component: () => (
      <RetailToRack
       company_list="checkbox"
        invoice_type="RG"
        invoice_type_dropdown={true}
        supplier_ids="6"
        owner_operator_invoice="Yes"
        title="Create Single Rack Invoice (Actual)"
        btnTtitle="Search Company"
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '5',
    label: <>Love - <strong>[Capped]</strong></>,
    component: () => (
      <RetailToRack
        invoice_type="Capped"
        supplier_ids="7"
        company_list="checkbox"
        type="loves"
        title="Update Single Rack Invoice (Capped)"
        btnTtitle="Create Rack Transaction"
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '6',
    label: <>Love - <strong>[Actual]</strong></>,
    component: () => (
      <RetailToRack
        invoice_type="Actual"
        supplier_ids="7"
        company_list="checkbox"
        type="loves"
        title="Update Single Rack Invoice (Actual)"
        btnTtitle="Create Rack Transaction"
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '7',
    label: "ULTRAMAR",
    component: () => (
      <RetailToRack 
       invoice_type=""
        supplier_ids="10"
        invoice_type_dropdown={true}
        title="Create Single Rack Invoice (Actual)"
        btnTtitle="Search Company" 
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '8',
    label: "Ultramar Owner Operator",
    component: () => (
      <RetailToRack
       company_list="checkbox"
        supplier_ids="10"
        invoice_type="RG"
        owner_operator_invoice="Yes"
        invoice_type_dropdown={true}
        type="ultramar"
        title="Create Single Rack Invoice (Actual)"
        btnTtitle="Update Transaction"
        api_name={retail_to_rack_Api}
      />
    ),
  },
  {
    id: '9',
    label: "Linamar Price Update",
    component: () => (
      <RetailToRack
        supplier_ids="6,4"
        countryDropDown={false}
        title="Linamar Price Update"
        btnTtitle="Update Transaction"
        api_name={retail_to_rack_Api}
      />
    ),
  },
];
