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
    component: <Repeat_Retail_Invoice supplier_ids="4"  supplier_name="" country="" invoice_type="RT"  invoice_creation="weekly" btnTtitle="Create Invoice" title="Create Old  Invoice "/>,
  },
  {
    id: '2',
    label:
    (
      <>
        Create Repeat Rack Invoice - <strong>[Capped]</strong>
      </>
    ),
    component: <Retail_capped supplier_ids="3"  supplier_name="" country="2" invoice_type="Capped"  invoice_creation="weekly" btnTtitle="Create Rack Invoice"  title="Create Repeat Rack Invoice [Capped]"/>,
  },
  
  {
    id: '3',
    label: 
     (
      <>
       Create Repeat Rack Invoice - <strong>[Actual]</strong>
      </>
    ),
    component: <Retail_capped supplier_ids="3"  supplier_name="" country="2" invoice_type="Actual"  invoice_creation="weekly" btnTtitle="Create Rack Invoice" title="Create Repeat Rack Invoice (Actual)"/>,
  },
   {
    id: '4',
    label:"Create Repeat Esso Invoice",
    component:  <SingleEssoForm supplier_ids="6"  supplier_name="ESSO " country="1" invoice_type=""  invoice_creation="weekly" type="esso_invoice" btnTtitle="Create Rack Invoice"  title="Create Repeat Esso Invoice"/>,
  },
 
  
   {
    id: '5',
    label:"Create Repeat Ultramar Invoice",
    component: <SingleEssoForm supplier_ids="10"  supplier_name="" country="1" invoice_type="RT"  invoice_creation="weekly" type="repeat_ultramar" btnTtitle="Create Repeat Ultramar Invoice" title="Create Repeat Ultramar Invoice" />,
  },
  
];
