import SingleMOneyCodeForm from '../../Components/createMoneyCode/SingleMOneyCodeForm';
import BulkMOneyCodeForm from '../../Components/createMoneyCode/BulkMoneyCodeForm';
import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleCustomized_ca from '../../Components/createCustomized/SingleCustomized_ca';
import BulkCustomized_ca from '../../Components/createCustomized/BulkCustomized_ca';
export const CreateCustomizedTab = [
  {
    id: '1',
    label: ' Single Customized Invoice (US)',
    component: <SingleRetailVoice type="single_customized" title="Single Customised Invoice (US)" btnTtitle="Create customized Invoice"/>,
  },
  {
    id: '2',
    label: 'Bulk Customized Invoice (US)',
    component: <BulkRetailInvoice type="bulk_customized" title="Bulk Customized Invoice (US)" btnTtitle="Create customized Invoice"/>,
  },
 {
    id: '3',
    label: 'Single Customized Invoice (CA)',
    component: <SingleCustomized_ca title="Single Customized Invoice (CA)" btnTtitle="Create customized Invoice"/>,
  },
  {
    id: '4',
    label: 'Bulk Customized Invoice (CA)',
    component: <BulkCustomized_ca title="Bulk Customized Invoice (CA)" btnTtitle="Create customized Invoice"/>,
  },
  
];