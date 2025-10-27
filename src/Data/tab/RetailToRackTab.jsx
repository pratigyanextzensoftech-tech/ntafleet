import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';
import RetailToRack from '../../Components/transaction/retailToRack/RetailToRack';
import EssoForm from '../../Components/transaction/retailToRack/EssoForm';
import EssoOwner from '../../Components/transaction/retailToRack/EssoOwner';
import Linamar from '../../Components/transaction/retailToRack/LinamarBar';
export const RetailToRackTab = [
  {
    id: '1',
    label:  (
      <>
       TA - <strong>[Capped]</strong>
      </>
    ),
    component: <RetailToRack btnTtitle="Create Rack Transaction" title="Create Single Rack Invoice (Capped)"/>,
  },
  {
    id: '2',
    label: (
      <>
       TA  - <strong>[Actual]</strong>
      </>
    ),
    component: <RetailToRack btnTtitle="Create Rack Transaction" title="Create Single Rack Invoice (Capped)"/>,
  },
  
  {
    id: '3',
     label: "Esso",
    component: <EssoForm  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
  },
   {
    id: '4',
    label:"ESSO Owner Operator",
    component: <EssoOwner  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
  },
 
  
   {
    id: '5',
    label: (
      <>
       Love - <strong>[Capped ]</strong>
      </>
    ),
    component: <RetailToRack type="loves" btnTtitle="Create Rack Transaction" title="Create Single Rack Invoice (Capped)"/>,
  },
   {
    id: '6',
    label: (
      <>
      Love - <strong>[Actual]</strong>
      </>
    ),
    component: <RetailToRack type="loves" btnTtitle="Create Rack Transaction" title="Create Single Rack Invoice (Capped)"/>,
  },
    {
    id: '7',
    label:"ULTRAMAR",
    component: <EssoForm type="ultramar"  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
  },
   {
    id: '8',
    label:"Ultramar Owner Operator",
    component: <EssoOwner type="ultramar"  title="Create Single Rack Invoice (Actual)" btnTtitle="Search Company"/>,
 
  },
  {
    id: '9',
    label:"Linamar Price Update",
    component: <Linamar  title="Linamar Price Update"  btnTtitle="Update Transaction"/>,
  },
];
