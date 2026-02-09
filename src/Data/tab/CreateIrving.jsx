import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {CreateUttramarInvoice,CreateUttramarOwnerInvoice,CreateUttramarCustomizedInvoice,} from "../../api/index";
export const CreateIrvingTab = [
  {
    id: "1",
    label: "Single Irving Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="5"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateUttramarInvoice}
        invoice_type_dropdown={true}
        type="single_irving"
        title="Create Single Irving Invoice"
        btnTtitle="Create Irving Invoice"
      />
    ),
  },
  {
    id: "2",
    label: "Bulk Irving Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="5"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateUttramarInvoice}
        invoice_type_dropdown={true}
        type="bulk_irving"
        title="Create Bulk Irving Invoice"
        btnTtitle="Create Bulk Irving Invoice"
      />
    ),
  },
  {
    id: "3",
    label: "Single Owner Operator Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="5"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        ul_owner_operator_invoice="Yes"
        api_name={CreateUttramarOwnerInvoice}
        invoice_type_dropdown={true}
        title="Create Single Owner Operator Invoice"
        btnTtitle="Create Single Owner Operator Invoice"
      />
    ),
  },
  {
    id: "4",
    label: "Bulk Owner Operator Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="5"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        ul_owner_operator_invoice="Yes"
        api_name={CreateUttramarOwnerInvoice}
        invoice_type_dropdown={true}
        title="Create Bulk Owner Operator Invoice"
        btnTtitle="Create Bulk Owner Operator Invoice"
      />
    ),
  },
  {
    id: "5",
    label: "Single Customized Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="5"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        cust_inv_type="Yes"
        api_name={CreateUttramarCustomizedInvoice}
        invoice_type_dropdown={true}
        title="Create Customized Invoice"
        btnTtitle="Create Customized Invoice"
      />
    ),
  },
  {
    id: "6",
    label: "Bulk Customized Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="5"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation=""
        cust_inv_type="Yes"
        api_name={CreateUttramarCustomizedInvoice}
        invoice_type_dropdown={true}
        title="Create Bulk Customized Invoice"
        btnTtitle="Create Bulk Customized Invoice"
      />
    ),
  },
];
