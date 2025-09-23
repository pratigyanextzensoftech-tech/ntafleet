import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import Repeat_Retail_Invoice from '../../Components/createRepeat/Repeat_Retail_Invoice';
import Retail_capped from '../../Components/createRepeat/Retail_capped';
export const CreateRepeatTab = [
  {
    id: '1',
    label:"Create Repeat Retail Invoice",
    component: <Repeat_Retail_Invoice btnTtitle="Create Invoice" title="Create Old  Invoice "/>,
  },
  {
    id: '2',
    label:
    (
      <>
        Create Repeat Rack Invoice - <strong>[Capped]</strong>
      </>
    ),
    component: <Retail_capped btnTtitle="Create Rack Invoice"  title="Create Repeat Rack Invoice [Capped]"/>,
  },
  
  {
    id: '3',
    label: 
     (
      <>
       Create Repeat Rack Invoice - <strong>[Actual]</strong>
      </>
    ),
    component: <Retail_capped btnTtitle="Create Rack Invoice" title="Create Repeat Rack Invoice (Actual)"/>,
  },
   {
    id: '4',
    label:"Create Repeat Esso Invoice",
    component:  <SingleEssoForm btnTtitle="Create Rack Invoice"  title="Create Repeat Esso Invoice"/>,
  },
 
  
   {
    id: '5',
    label:"Create Repeat Ultramar Invoice",
    component: <SingleEssoForm type="repeat_ultramar" btnTtitle="Create Repeat Ultramar Invoice" />,
  },
  
];
