import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateRetailInvoice,
 
} from "../../api/index";

export const 
CreateCustomizedTab = [
  {
    id: '1',
    label: ' Single Customized Invoice (US)',
    component: <CreateInvoiceCommon   supplier_ids="3"
        company_list="list"
        country_id="2"
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice}  title="Single Customised Invoice (US)" btnTtitle="Create customized Invoice"/>,
  },
  {
    id: '2',
    label: 'Bulk Customized Invoice (US)',
    component: <CreateInvoiceCommon   supplier_ids="3"
        company_list=""
        country_id="2"
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice} title="Bulk Customized Invoice (US)" btnTtitle="Create customized Invoice"/>,
  },
 {
    id: '3',
    label: 'Single Customized Invoice (CA)',
    component: <CreateInvoiceCommon   supplier_ids="6,10"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_type_dropdown={true}
        invoice_creation="weekly"
        api_name={CreateRetailInvoice} title="Single Customized Invoice (CA)" btnTtitle="Create customized Invoice"/>,
  },
  {
    id: '4',
    label: 'Bulk Customized Invoice (CA)',
    component: <CreateInvoiceCommon   supplier_ids="1,3,4,5,7"
        company_list=""
        country_id="1"
         invoice_type=""
        invoice_type_dropdown={true}
        invoice_creation="weekly"
        api_name={CreateRetailInvoice} title="Bulk Customized Invoice (CA)" btnTtitle="Create customized Invoice"/>,
  },
  
];