import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';

export const CreateInvoiceDumyData = [
  {
    id: '1',
    label: 'Create Single Retail Invoice',
    component: <SingleRetailVoice supplier_ids="1,3,4,5,7"  supplier_name="" country="" invoice_type="RT"  invoice_creation="weekly"  btnTtitle="Create Invoice" title="Create Single Retail Invoice"/>,
  },
  {
    id: '2',
    label: 'Create Bulk Retail Invoice',
    component: <BulkRetailInvoice supplier_ids="1,3,4,5,7"  supplier_name="" country="" invoice_type="RT"  invoice_creation="weekly" btnTtitle="Create Invoice"  title="Create Bulk Retail Invoice"/>,
  },
  {
    id: '3',
    label: (
      <>
        Create Single Retail Invoice - <strong>Multi</strong>
      </>
    ),
    component: <SingleRetailMulti supplier_ids="1,3,4,5,7"  supplier_name="" country="" invoice_type="RT" invoice_creation="many_times"  btnTtitle="Create Invoice"  title="Create Single Retail Invoice(Multi)"/>,
  },
  {
    id: '4',
    label: (
      <>
        Create Bulk Retail Invoice - <strong>Multi</strong>
      </>
    ),
    component: <BulkRetailMulti supplier_ids="1,3,4,5,7" invoice_type="RT" country="" invoice_creation="many_times" btnTtitle="Create Invoice"  title="Create Bulk Retail Invoice(Multi)"/>,
  },
];
