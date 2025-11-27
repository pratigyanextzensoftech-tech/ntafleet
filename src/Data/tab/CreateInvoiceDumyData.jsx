import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateRetailInvoice,
 
} from "../../api/index";

export const CreateInvoiceDumyData = [
  {
    id: "1",
    label: "Create Single Retail Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="1,3,4,5,7"
        company_list="list"
        country_id=""
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice}
        btnTtitle="Create Invoice"
        title="Create Single Retail Invoice"
      />
    ),
  },
  {
    id: "2",
    label: "Create Bulk Retail Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="1,3,4,5,7"
        company_list=""
        country_id=""
        invoice_type="RT"
        invoice_creation="weekly"
        api_name={CreateRetailInvoice}
        btnTtitle="Create Invoice"
        title="Create Bulk Retail Invoice"
      />
    ),
  },
  {
    id: "3",
    label: (
      <>
        Create Single Retail Invoice - <strong>Multi</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="1,3,4,5,7"
        company_list="list"
        country_id=""
        invoice_type="RT"
        invoice_creation="many_times"
        api_name={CreateRetailInvoice}
        btnTtitle="Create Invoice"
        title="Create Single Retail Invoice(Multi)"
      />
    ),
  },
  {
    id: "4",
    label: (
      <>
        Create Bulk Retail Invoice - <strong>Multi</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="1,3,4,5,7"
        company_list="checkbox"
        country_id=""
        invoice_type="RT"
        invoice_creation="many_times"
        api_name={CreateRetailInvoice}
        btnTtitle="Create Invoice"
        title="Create Bulk Retail Invoice(Multi)"
      />
    ),
  },
];
