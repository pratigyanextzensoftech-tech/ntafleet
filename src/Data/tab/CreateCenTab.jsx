import CreateInvoiceCommon from "../../Components/createInvoice/CreateInvoiceCommon";
import {
  CreateCenInvoice,
  CreateCenOwnerInvoice,
  CreateCenCustomizedInvoice,
} from "../../api/index";

export const CenInvoiceTab = [
  {
    id: "1",
    label: "Single Cen",
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateCenInvoice}
        invoice_type_dropdown={true} 
        btnTtitle="Create Cenovus Invoice"
        title="Create Single Cenovus Invoice "

      />
    ),
  },
  {
    id: "2",
    label: "Bulk Cen",
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateCenInvoice}
        invoice_type_dropdown={true}
        btnTtitle="Create Bulk Cenovus Invoice"
        title="Create Bulk Cenovus Invoice"
      />
    ),
  },

  {
    id: "3",
    label: "Single Owner Operator",
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateCenOwnerInvoice}
        invoice_type_dropdown={true}
        owner_operator_invoice="Yes"
        btnTtitle="Create Owner Operator Invoice"
        title="Create Single Owner Operator Invoice "
      />
    ),
  },
  {
    id: "4",
    label: "Bulk Owner Operator",
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list=""
        country_id="1"
        invoice_type="RG"
        invoice_creation="weekly"
        api_name={CreateCenOwnerInvoice}
        invoice_type_dropdown={true}
        owner_operator_invoice="Yes"
        type="bulk_owner"
        btnTtitle="Create Bulk Owner Operator Invoice"
        title="Create Bulk Owner Operator Invoice"
      />
    ),
  },

  {
    id: "5",
    label: "Single Customized",
    component: (
      <CreateInvoiceCommon
       supplier_ids="11"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateCenCustomizedInvoice}
        invoice_type_dropdown={true}
        cust_inv_type="Yes"
        btnTtitle="Create Customized Invoice"
        title="Create Customized Invoice "
      />
    ),
  },
  {
    id: "6",
    label: "Bulk Customized",
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation="weekly"
        api_name={CreateCenCustomizedInvoice}
        invoice_type_dropdown={true}
        cust_inv_type="Yes"
        btnTtitle="Create Bulk Customized Invoice"
        title="Create Bulk Customized Invoice "
      />
    ),
  },
  // {
  //   id: '7',
  //   label: 'RP as R',
  //   component: <SingleEssoForm supplier_ids=""  supplier_name="" country="" invoice_creation="weekly" invoice_type ="Actual"  type="owner_operator" btnTtitle="Create RP as R Invoice" title="Create RP as R Invoice" />,
  // },
  {
    id: "8",
    label: (
      <>
        Single Cen - <strong>[ Multi ]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list="list"
        country_id="1"
        invoice_type=""
        invoice_creation="many_times"
        api_name={CreateCenInvoice}
        invoice_type_dropdown={true}
        btnTtitle="Create  Cenovus Invoice"
        title="Create Single Cenovus Invoice-[Multi]"
      />
    ),
  },
  {
    id: "9",
    label: (
      <>
        Bulk Cen - <strong>[ Multi ]</strong>
      </>
    ),
    component: (
      <CreateInvoiceCommon
        supplier_ids="11"
        company_list=""
        country_id="1"
        invoice_type=""
        invoice_creation="many_times"
        api_name={CreateCenInvoice}
        invoice_type_dropdown={true}
        btnTtitle="Create Bulk Cenovus Invoice"
        title="Create Bulk Cenovus Invoice"
      />
    ),
  },
  // {
  //   id: "10",
  //   label: (
  //     <>
  //       Single Owner Operator- <strong>[ Multi ]</strong>
  //     </>
  //   ),
  //   component: (
  //     <CreateInvoiceCommon
  //       supplier_ids="6"
  //       company_list="list"
  //       country_id="1"
  //       invoice_type=""
  //       invoice_creation="many_times"
  //       api_name={CreateEssoInvoice}
  //       invoice_type_dropdown={true}
  //       owner_operator_invoice="Yes"
  //       btnTtitle="Create  Owner Operator Invoice"
  //       title="Create Single Owner Operator Invoice-[Multi]"
  //     />
  //   ),
  // },
  // {
  //   id: "11",
  //   label: (
  //     <>
  //       Bulk Owner Operator- <strong>[ Multi ]</strong>
  //     </>
  //   ),
  //   component: (
  //     <CreateInvoiceCommon
  //       supplier_ids="6"
  //       company_list="checkbox"
  //       country_id="1"
  //       invoice_type=""
  //       invoice_creation="many_times"
  //       api_name={CreateEssoInvoice}
  //       invoice_type_dropdown={true}
  //       owner_operator_invoice="Yes"
  //       btnTtitle="Create Bulk Owner Operator Invoice"
  //       title="Create Bulk Owner Operator Invoice (MULTI)"
  //     />
  //   ),
  // },
];
