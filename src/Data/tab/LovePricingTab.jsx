import CreateLoveBulk from '../../Components/pricing/loveBulk/CreateLoveBulk';
import MailLoveBulk from '../../Components/pricing/loveBulk/MailLoveBulk';
import PricingCommon from '../../Components/pricing/PricingCommon';
import { create_pricing_pdf,love_pricing_pdf } from '../../api';
import MailPricingCommon from '../../Components/pricing/MailPricingCommon';

export const LovePricingTab = [
  {
    id: '1',
    label:"Create LOVE Bulk Pricing PDF"  , 
    component: <PricingCommon taxOption={false} tableTitle="Pricing PDF List "  listapi={love_pricing_pdf}  table={true}  apiName={create_pricing_pdf} pricingDate={true} supplier={true} supplier_ids="7" discountType={true} testingEmail={true} validation={true}  title="Create Bulk Pricing PDF" btnTitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Love Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List " supplier="LOVE" listapi={love_pricing_pdf} invoiceType="Capped" supplier_ids="7" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
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
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List " supplier="LOVE" listapi={love_pricing_pdf} supplier_ids="7" invoiceType="Actual" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  }
 
  
];