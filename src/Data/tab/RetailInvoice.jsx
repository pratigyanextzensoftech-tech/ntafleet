import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';
export const RetailInvoiceTab = [
  {
    id: '1',
    label:  (
      <>
        Single Rack  - <strong>[Capped]</strong>
      </>
    ),
    component: <SingleRetailVoice btnTtitle="Create Rack Invoice" title="Create Single Rack Invoice (Capped)"/>,
  },
  {
    id: '2',
    label: (
      <>
        Bulk Rack  - <strong>[Capped]</strong>
      </>
    ),
    component: <BulkRetailInvoice btnTtitle="Create Bulk Rack Invoice"  title="Create Bulk Rack Invoice (Capped)"/>,
  },
  
  {
    id: '3',
    label: (
      <>
       Single Rack - <strong>[Actual]</strong>
      </>
    ),
    component: <SingleRetailMulti type="single_rack_actual" title="Create Single Rack Invoice (Actual)" btnTtitle="Create  Rack Invoice"/>,
  },
   {
    id: '4',
    label: (
      <>
       Bulk Rack - <strong>[Actual]</strong>
      </>
    ),
    component: <BulkRetailMulti  type="bulk_rack_actual" btnTtitle="Create Bulk Rack Invoice" title="Create Bulk Rack Invoice (Actual)"  checkBoxData={checkBoxData}/>,
  },
 
  
   {
    id: '5',
    label: (
      <>
       Single Rack - <strong>[Capped Multi ]</strong>
      </>
    ),
    component: <SingleRetailVoice btnTtitle="Create Rack Invoice" title="Create Single Rack Invoice (Capped)"/>,
  },
   {
    id: '6',
    label: (
      <>
       Bulk Rack - <strong>[Capped Multi ]</strong>
      </>
    ),
    component: <BulkRetailMulti  btnTtitle="Create Bulk Rack Invoice" title="Create Bulk Rack Invoice (Capped)"  checkBoxData={checkBoxData}/>,
  },
    {
    id: '7',
    label: (
      <>
       Single Rack - <strong>[Actual Multi ]</strong>
      </>
    ),
    component: <SingleRetailVoice type="single_rack_actual" btnTtitle="Create Rack Invoice" title="Create Single Rack Invoice (Actual-MULTI)"/>,
  },
   {
    id: '8',
    label: (
      <>
       Bulk Rack - <strong>[Actual Multi ]</strong>
      </>
    ),
    component: <BulkRetailMulti type="bulk_rack_actual" btnTtitle="Create Bulk Rack Invoice" title="Create Bulk Rack Invoice (Actual-MULTI)"  checkBoxData={checkBoxData}/>,
 
  },
];
