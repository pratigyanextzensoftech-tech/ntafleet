import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateRetailInvoice,
 
} from "../../api/index";
export const CreateRepeatTab = [
  {
    id: '1',
    label:"Create Repeat Retail Invoice",
    component: <CreateInvoiceCommon supplier_ids="4"  
        company_list="list"
        country_id=""
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice}     btnTtitle="Create Invoice" title="Create Old  Invoice "/>,
  },
  {
    id: '2',
    label:
    (
      <>
        Create Repeat Rack Invoice - <strong>[Capped]</strong>
      </>
    ),
    component: <CreateInvoiceCommon supplier_ids="3" 
     company_list="list"
        country_id="2"
        api_name={CreateRetailInvoice} country=""
      supplier_name=""  invoice_type="Capped"  invoice_creation="weekly" btnTtitle="Create Rack Invoice"  title="Create Repeat Rack Invoice [Capped]"/>,
  },
  
  {
    id: '3',
    label: 
     (
      <>
       Create Repeat Rack Invoice - <strong>[Actual]</strong>
      </>
    ),
    component: <CreateInvoiceCommon supplier_ids="3"  company_list="list"
        country_id="2"
        api_name={CreateRetailInvoice} country="" invoice_type="Actual"  invoice_creation="weekly" btnTtitle="Create Rack Invoice" title="Create Repeat Rack Invoice (Actual)"/>,
  },
   {
    id: '4',
    label:"Create Repeat Esso Invoice",
    component:  <CreateInvoiceCommon supplier_ids="6"  
     company_list="list"
             invoice_type_dropdown={true}
        country_id="1"
        api_name={CreateRetailInvoice} 
    invoice_type=""  invoice_creation="weekly" type="esso_invoice" btnTtitle="Create Rack Invoice"  title="Create Repeat Esso Invoice"/>,
  },
 
  
   {
    id: '5',
    label:"Create Repeat Ultramar Invoice",
    component: <CreateInvoiceCommon supplier_ids="10" 
     company_list="list"
        country_id="1"
        invoice_type=""
         invoice_type_dropdown={true}
        invoice_creation="weekly"
        api_name={CreateRetailInvoice} country=""
       btnTtitle="Create Repeat Ultramar Invoice" title="Create Repeat Ultramar Invoice" />,
  },
  
];
