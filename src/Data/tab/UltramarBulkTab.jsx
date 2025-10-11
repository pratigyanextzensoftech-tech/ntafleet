import CreateUltramar from '../../Components/pricing/ultramar/CreateUltramar';
import MailUltramar from '../../Components/pricing/ultramar/MailUltramar';
export const UltramarBulkTab = [
  {
    id: '1',
    label:"Create ULTRAMAR Bulk Pricing PDF (Without Tax)"  , 
    component: <CreateUltramar title="Create Bulk Pricing PDF (Without Tax)" btnTtitle="Create  Pricing PDF (without Tax)"/>,
  },
  {
    id: '2',
    label:"Mail ULTRAMAR Bulk Pricing PDF (Without Tax)",
    component: <MailUltramar title="Mail Bulk Pricing PDF (Without Tax)" btnTtitle="Search pricing Pdf (without Tax)"/>,
  },
  {
    id: '3',
    label: "Create ULTRAMAR Bulk Pricing PDF (With Tax)"
   ,
    component: <CreateUltramar title="Mail Bulk Pricing PDF (Without Tax)" btnTtitle="Search Pricing PDF (Without Tax)"/>,
  },
 {
    id: '4',
    label:" Mail ULTRAMAR Bulk Pricing PDF (With Tax)", 
    component: <MailUltramar title="Mail Bulk Pricing PDF (Without Tax)" btnTtitle="Search Pricing Pdf (Without Tax)"/>,
  },
];