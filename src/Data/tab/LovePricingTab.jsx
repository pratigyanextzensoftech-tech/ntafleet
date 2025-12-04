import CreateLoveBulk from '../../Components/pricing/loveBulk/CreateLoveBulk';
import MailLoveBulk from '../../Components/pricing/loveBulk/MailLoveBulk';
import PricingCommon from '../../Components/pricing/PricingCommon';
import { create_pricing_pdf } from '../../api';

export const LovePricingTab = [
  {
    id: '1',
    label:"Create LOVE Bulk Pricing PDF"  , 
    component: <PricingCommon apiName={create_pricing_pdf} pricingDate={true} supplier={true} supplier_ids="7" discountType={true} testingEmail={true} validation={true}  title="Create Bulk Pricing PDF" btnTitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Love Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="7" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Mail Love Bulk Pricing - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <MailLoveBulk title="Mail Bulk Pricing PDF" btnTtitle="Search pricing Pdf"/>,
  }
 
  
];