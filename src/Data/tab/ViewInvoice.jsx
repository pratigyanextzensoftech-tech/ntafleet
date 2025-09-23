import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import OwnerOperator from '../../Components/viewInvoice/OwnerOperator';
import ViewInvoiceForm from '../../Components/viewInvoice/ViewInvoiceForm';
import CustomizedInvoice from '../../Components/viewInvoice/CustomizedInvoice';
export const View_Invoice = [
  {
    id: '1',
    label: 'View Invoices',
    component: <ViewInvoiceForm />,
  },
  {
    id: '2',
    label: 'View Owner Operator Invoices',
    component: <OwnerOperator />,
  },
  {
    id: '3',
    label:'View Customised Invoices',
    component: <CustomizedInvoice />,
  },
  
];