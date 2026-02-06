import CreateLoveBulk from '../../Components/pricing/loveBulk/CreateLoveBulk';
import MailLoveBulk from '../../Components/pricing/loveBulk/MailLoveBulk';
import PricingCommon from '../../Components/pricing/PricingCommon';
import { create_pricing_pdf,love_pricing_pdf } from '../../api';
import MailPricingCommon from '../../Components/pricing/MailPricingCommon';

export const IrvingPricingTab = [
  {
    id: '1',
    label:"Create Irving Bulk Pricing PDF"  , 
    component: <PricingCommon  listapi={love_pricing_pdf}  table={true}  apiName={create_pricing_pdf} pricingDate={true} supplier={true} supplier_ids="5" discountType={true} testingEmail={true} validation={true}  title="Create Bulk Pricing PDF" btnTitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Irving Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <MailPricingCommon supplier="IRVING" listapi={love_pricing_pdf} invoiceType="Capped" supplier_ids="5" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Mail Irving Bulk Pricing - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <MailPricingCommon supplier="IRVING" listapi={love_pricing_pdf} supplier_ids="5" invoiceType="Actual" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  }
 
  
];