import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import { CreateRackInvoice } from "../../api/index";
export const RetailInvoiceTab = [
  {
    id: "1",
    label: (
      <>
        Single Rack - <strong>[Capped]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list="list"
        country_id="2"
        invoice_type="R"
        ta_retail_invoice="Capped"
        invoice_creation="weekly"
        api_name={CreateRackInvoice}
        btnTtitle="Create Rack Invoice"
        title="Create Single Rack Invoice (Capped)"
      />
    ),
  },
  {
    id: "2",
    label: (
      <>
        Bulk Rack - <strong>[Capped]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list=""
        country_id="2"
        invoice_type="R"
        ta_retail_invoice="Capped"
        invoice_creation="weekly"
        api_name={CreateRackInvoice}
        btnTtitle="Create Bulk Rack Invoice"
        title="Create Bulk Rack Invoice (Capped)"
      />
    ),
  },

  {
    id: "3",
    label: (
      <>
        Single Rack - <strong>[Actual]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list="list"
        country_id="2"
       invoice_type="R"
        ta_retail_invoice="Actual"
        invoice_creation="weekly"
        api_name={CreateRackInvoice}
        btnTtitle="Create Rack Invoice"
        title="Create Single Rack Invoice (Actual)"
      />
    ),
  },
  {
    id: "4",
    label: (
      <>
        Bulk Rack - <strong>[Actual]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list=""
        country_id="2"
        invoice_type="R"
        ta_retail_invoice="Actual"
        invoice_creation="weekly"
        api_name={CreateRackInvoice}
        btnTtitle="Create Bulk Rack Invoice"
        title="Create Bulk Rack Invoice (Actual)"
      />
    ),
  },

  {
    id: "5",
    label: (
      <>
        Single Rack - <strong>[Capped Multi ]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list="list"
        country_id="2"
       invoice_type="R"
        ta_retail_invoice="Capped"
        invoice_creation="many_times"
        api_name={CreateRackInvoice}
        btnTtitle="Create Rack Invoice"
        title="Create Single Rack Invoice (Capped)"
      />
    ),
  },
  {
    id: "6",
    label: (
      <>
        Bulk Rack - <strong>[Capped Multi ]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list="checkbox"
        country_id="2"
        invoice_type="R"
        ta_retail_invoice="Capped"
        invoice_creation="many_times"
        api_name={CreateRackInvoice}
        btnTtitle="Create Bulk Rack Invoice"
        title="Create Bulk Rack Invoice (Capped)"
      />
    ),
  },
  {
    id: "7",
    label: (
      <>
        Single Rack - <strong>[Actual Multi ]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list="list"
        country_id="2"
        invoice_type="R"
        ta_retail_invoice="Actual"
        invoice_creation="many_times"
        api_name={CreateRackInvoice}
        btnTtitle="Create Rack Invoice"
        title="Create Single Rack Invoice (Actual-MULTI)"
      />
    ),
  },
  {
    id: "8",
    label: (
      <>
        Bulk Rack - <strong>[Actual Multi ]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="3"
        company_list="checkbox"
        country_id="2"
        invoice_type="R"
        ta_retail_invoice="Actual"
        invoice_creation="many_times"
        api_name={CreateRackInvoice}
        btnTtitle="Create Bulk Rack Invoice"
        title="Create Bulk Rack Invoice (Actual-MULTI)"
      />
    ),
  },
];
