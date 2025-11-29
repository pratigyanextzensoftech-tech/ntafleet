import CreateUltramar from '../../Components/pricing/ultramar/CreateUltramar';
import MailUltramar from '../../Components/pricing/ultramar/MailUltramar';
import PricingCommon from '../../Components/pricing/PricingCommon';
export const UltramarBulkTab = [
  {
    id: '1',
    label:"Create ULTRAMAR Bulk Pricing PDF (Without Tax)"  , 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="10" testingEmail={true} validation={true}  title="Create Bulk Pricing PDF (Without Tax)" btnTitle="Create  Pricing PDF (without Tax)"/>,
  },
  {
    id: '2',
    label:"Mail ULTRAMAR Bulk Pricing PDF (Without Tax)",
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="10" title="Mail Bulk Pricing PDF (Without Tax)" btnTitle="Search pricing Pdf (without Tax)"/>,
  },
  {
    id: '3',
    label: "Create ULTRAMAR Bulk Pricing PDF (With Tax)"
   ,
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="10" testingEmail={true} validation={true} title="Mail Bulk Pricing PDF (Without Tax)" btnTitle="Create Pricing PDF (With Tax)"/>,
  },
 {
    id: '4',
    label:" Mail ULTRAMAR Bulk Pricing PDF (With Tax)", 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="10" title="Mail Bulk Pricing PDF (Without Tax)" btnTitle="Search Pricing Pdf (Without Tax)"/>,
  },
];