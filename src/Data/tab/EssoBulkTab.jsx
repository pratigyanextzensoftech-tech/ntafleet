import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import MailEsso from '../../Components/pricing/essoBulk/MailEsso';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import CreateEsso from '../../Components/pricing/essoBulk/CreateEsso';
export const EssoBulkTab = [
  {
    id: '1',
    label:"Create ESSO PDF (Without Tax)",
    component: <CreateEsso btnTtitle="Create  Pricing PDF (Without Tax)" title="Create Bulk Pricing PDF (Without Tax) "/>,
  },
  {
    id: '2',
    label:"Mail ESSO PDF (Without Tax)",
    component: <MailEsso btnTtitle="Search Pricing PDF (Without Tax)"   title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
  
  {
    id: '3',
    label: "Create ESSO PDF (With Tax)",
    component: <CreateEsso btnTtitle="Create Pricing PDF (With Tax)" title="Create Bulk Pricing PDF (With Tax)
"/>,
  },
   {
    id: '4',
    label:"Mail ESSO PDF (With Tax)",
    component:  <MailEsso btnTtitle="Search Pricing PDF (With Tax)"   title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
 
  
   {
    id: '5',
    label:"Mail ESSO PDF (Without Tax)",
    component: <MailEsso btnTtitle="Search Pricing PDF (Without Tax)" title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
    {
    id: '6',
    label:"Mail ESSO PDF (With Tax)",
    component: <MailEsso btnTtitle="Search Pricing PDF (With Tax)" title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
];
