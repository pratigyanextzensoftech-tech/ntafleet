import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateUttramarInvoice,
  CreateUttramarOwnerInvoice,
  CreateUttramarCustomizedInvoice,
} from "../../api/index";
export const CreateUltramarTab = [
  {
    id: "1",
    label: "Single Ultramar Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="10"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateUttramarInvoice}
        invoice_type_dropdown={true}
        type="single_ultramar"
        title="Create Single ULTRAMAR Invoice"
        btnTtitle="Create ULTRAMAR Invoice"
      />
    ),
  },
  {
    id: "2",
    label: "Bulk Ultramar Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="10"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateUttramarInvoice}
        invoice_type_dropdown={true}
        type="bulk_ultramar"
        title="Create Bulk ULTRAMAR Invoice"
        btnTtitle="Create Bulk ULTRAMAR Invoice"
      />
    ),
  },
  {
    id: "3",
    label: "Single Owner Operator Invoice",
    component: (
      <CreateInvoiceCommon
        supplier_ids="10"
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
        supplier_ids="10"
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
        supplier_ids="10"
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
        supplier_ids="10"
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
