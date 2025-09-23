import BulkEssoForm from '../../Components/createEssoInvoice/BulkEssoForm';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';

export const CreateUltramarTab = [
  {
    id: '1',
    label: 'Single Ultramar Invoice',
    component: <SingleEssoForm type="single_ultramar" title="Create Single ULTRAMAR Invoice" btnTtitle="Create  ULTRAMAR   Invoice"/>,
  },
  {
    id: '2',
    label: 'Bulk UltramarInvoice',
    component: <BulkEssoForm type="bulk_ultramar" title="Create Bulk ULTRAMAR Invoice" btnTtitle="Create Bulk ULTRAMAR Invoice"/>,
  },
    {
    id: '3',
    label: 'Single Owner Operator Invoice',
    component: <SingleEssoForm type="single_owner_ultramar" title="Create Single Owner Operator Invoice" btnTtitle="Create Single Owner Operator Invoice"/>,
  },
    {
    id: '4',
    label: 'Bulk Owner Operator Invoice',
    component: <BulkEssoForm type="bulk_owner_ultramar" title="Create Bulk Owner Operator Invoice" btnTtitle="Create Bulk Owner Operator Invoice"/>,
  },
    {
    id: '5',
    label: 'Single Customized Invoice',
    component: <SingleEssoForm type="single_ultramar" title="Create Customized Invoice" btnTtitle="Create Customized Invoice"/>,
  },
    {
    id: '6',
    label: 'Bulk Customized Invoice',
    component: <BulkEssoForm type="bulk_ultramar" title="Create Bulk Customized Invoice" btnTtitle="Create Bulk Customized Invoice"/>,
  },
 
  
];