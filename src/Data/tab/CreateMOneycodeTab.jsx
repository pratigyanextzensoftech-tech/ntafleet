import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateMonocodeInvoice,
 
} from "../../api/index";
export const CreateMoneyCodeTab = [
  {
    id: '1',
    label: 'Create Single MoneyCode Invoice',
    component: <CreateInvoiceCommon   
        suplier_list={false}
        country_list={false}
        country_id=""
        company_list="list"
        // invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateMonocodeInvoice} title="Create Single MoneyCode Invoice" btnTtitle="Create  Invoice"/>,
  },
  {
    id: '2',
    label: 'Create Bulk MoneyCode Invoice',
    component: <CreateInvoiceCommon  company_list=""
        suplier_list={false}
        country_list={false}
        country_id=""
        // invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateMonocodeInvoice}  title="Create Bulk MoneyCode Invoice" btnTtitle="Create MoneyCode Invoice"/>,
  },
 
  
];