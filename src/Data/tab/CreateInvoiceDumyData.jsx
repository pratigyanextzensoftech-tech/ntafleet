import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';

export const CreateInvoiceDumyData = [
  {
    id: '1',
    label: 'Create Single Retail Invoice',
    component: <SingleRetailVoice  btnTtitle="Create Invoice" title="Create Invoice"/>,
  },
  {
    id: '2',
    label: 'Create Bulk Retail Invoice',
    component: <BulkRetailInvoice  btnTtitle="Create Invoice"  title="Create Invoice"/>,
  },
  {
    id: '3',
    label: (
      <>
        Create Single Retail Invoice - <strong>Multi</strong>
      </>
    ),
    component: <SingleRetailMulti  btnTtitle="Create Invoice"  title="Create Invoice"/>,
  },
  {
    id: '4',
    label: (
      <>
        Create Bulk Retail Invoice - <strong>Multi</strong>
      </>
    ),
    component: <BulkRetailMulti btnTtitle="Create Invoice" checkBoxData={checkBoxData}  title="Create Invoice"/>,
  },
];
