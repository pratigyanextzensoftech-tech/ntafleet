import SingleRetailVoice from '../../Components/createInvoice/SingleRetailVoice';
import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import BulkRetailMulti from '../../Components/createInvoice/BulkRetailMulti';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import { checkBoxData } from '../../Components/Forms/FormWidget/FormSelect2/OptionDatas';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
export const SendBulkTab = [
  {
    id: '1',
    label:"Send Invoice",
    component: <SingleEssoForm btnTtitle="Search Invoice" title="Search Invoice "/>,
  },
  {
    id: '2',
    label:"Sender Owner Operator Invoice",
    component: <BulkRetailInvoice btnTtitle="Search Data" btn1Title="Reset"  title="Filters"/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component: <SingleEssoForm btnTtitle="Search Data" title="Search Invoice"/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:  <BulkRetailInvoice btnTtitle="Search Data" btn1Title="Reset"  title="Filters"/>,
  },
 
  
   {
    id: '5',
    label:"Send T-check Invoice",
    component: <SingleEssoForm btnTtitle="Search Data" title="Filters"/>,
  },
  
];
