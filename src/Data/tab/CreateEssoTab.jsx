import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import BulkEssoForm from '../../Components/createEssoInvoice/BulkEssoForm';
import BulkEssoMulti from '../../Components/createEssoInvoice/BulkEssoMulti'
export const EssoInvoiceTab = [
  {
    id: '1',
    label: "Single Esso",
    component: <SingleEssoForm supplier_ids="6"  supplier_name="ESSO" country="1"  invoice_creation="weekly" invoice_type =""  type="single" btnTtitle="Create Esso Invoice" title="Create Single Esso Invoice " />,
  },
  {
    id: '2',
    label: "Bulk Esso",
    component: <BulkEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="weekly" invoice_type ="" tab="bulk_esso" btnTtitle="Create Bulk Esso Invoice" title="Create Bulk Esso Invoice" />,
  },

  {
    id: '3',
    label: "Single Owner Operator",
    component: <SingleEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="weekly" invoice_type ="" type="owner_operator" btnTtitle="Create Owner Operator Invoice" title="Create Single Owner Operator Invoice " />,
  },
  {
    id: '4',
    label: "Bulk Owner Operator",
    component: <BulkEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="weekly" invoice_type ="" type="bulk_owner" btnTtitle="Create Bulk Owner Operator Invoice" title="Create Bulk Owner Operator Invoice" checkBoxData={checkBoxData} />,
  },


  {
    id: '5',
    label: "Single Customized",
    component: <SingleEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="weekly" invoice_type =""  type="single" btnTtitle="Create Customized Invoice" title="Create Customized Invoice " />,
  },
  {
    id: '6',
    label: "Bulk Customized",
    component: <BulkEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="weekly" invoice_type ="" btnTtitle="Create Bulk Customized Invoice" title="Create Bulk Customized Invoice " />,
  },
  // {
  //   id: '7',
  //   label: 'RP as R',
  //   component: <SingleEssoForm supplier_ids=""  supplier_name="" country="" invoice_creation="weekly" invoice_type ="Actual"  type="owner_operator" btnTtitle="Create RP as R Invoice" title="Create RP as R Invoice" />,
  // },
  {
    id: '8',
    label: (
      <>
        Single Esso - <strong>[ Multi ]</strong>
      </>
    ),
    component: <SingleEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="many_times" invoice_type ="" type="esso_invoice" btnTtitle="Create  Esso Invoice" title="Create Single Esso Invoice-[Multi]" checkBoxData={checkBoxData} />,

  },
  {
    id: '9',
    label: (
      <>
        Bulk Esso - <strong>[ Multi ]</strong>
      </>
    ),
    component: <BulkEssoMulti supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="many_times" invoice_type ="" checkBoxData={checkBoxData}  type="bulk_esso" btnTtitle="Create Bulk Esso Invoice" title="Create Bulk Esso Invoice" />,

  },
  {
    id: '10',
    label: (
      <>
        Single Owner Operator- <strong>[ Multi ]</strong>
      </>
    ),
    component: <SingleEssoForm supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="many_times" invoice_type ="" type="owner_operator" btnTtitle="Create  Owner Operator Invoice" title="Create Single Owner Operator Invoice-[Multi]"  />,

  },
  {
    id: '11',
    label: (
      <>
        Bulk Owner Operator- <strong>[ Multi ]</strong>
      </>
    ),
    component: <BulkEssoMulti supplier_ids="6"  supplier_name="ESSO" country="1" invoice_creation="many_times" invoice_type ="" checkBoxData={checkBoxData} type="bulk_esso" btnTtitle="Create Bulk Owner Operator Invoice" title="Create Bulk Owner Operator Invoice (MULTI)"/>,

  },
];
