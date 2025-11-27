import OldRetailInvoice from "../../Components/creatwOldInvoice/OldRetailInvoice";
import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateRetailInvoice,
 
} from "../../api/index";
export const CreateOldInvoiceTab = [
  {
    id: '1',
    label: 'Create Old Retail Invoice',
    component: <CreateInvoiceCommon supplier_ids="1,4,3"
        company_list="list"
        country_id=""
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice}  title="Create Old Retail Invoice" btnTtitle="Create Old Rack Invoice" />,
  },
  {
    id: '2',
    label: 'Create Old Rack Invoice',
    component: <CreateInvoiceCommon supplier_ids="1,4,3"
        defaultSupplierValue={true}
        company_list="list"
        country_id=""
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice}  title="Create Old Rack Invoice" btnTtitle="Create Old Rack Invoice" />,
  },


];