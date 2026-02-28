import CreateRetailTaPetro from '../../Components/pricing/taPetroBulk/CreateRetailTaPetro';
import CreateTaPetro from '../../Components/pricing/taPetroBulk/CreateTaPetro';
import MailTaPetro from '../../Components/pricing/taPetroBulk/MailTaPetro';
import PricingCommon from '../../Components/pricing/PricingCommon';
import { create_pricing_pdf,ta_pricing_pdf } from '../../api';
import MailPricingCommon from '../../Components/pricing/MailPricingCommon';
import MailPricingIndex from '../../Components/pricing/MailPricingIndex';
export const TaPetroTab = [
  {
    id: '1',
    label:"Create Ta-Petro Bulk Pricing"  , 
    component: <PricingCommon taxOption={false} tableTitle="Pricing PDF List"  listapi={ta_pricing_pdf}  table={true} invoiceType=""  apiName={create_pricing_pdf} validation={true} pricingDate={true} supplier={true} supplier_ids="3" testingEmail={true} discountType={true} title="Create Bulk Pricing PDF" btnTitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List " supplier="TA" listapi={ta_pricing_pdf} invoiceType="Capped" supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Mail Ta-Petro Bulk Pricing - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <MailPricingCommon  taxOption={false} tableTitle="Pricing PDF List " supplier="TA" listapi={ta_pricing_pdf} invoiceType="Actual"   supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  },
 {
    id: '4',
    label:" Mail Ta-Petro Bulk Pricing (Non-Customer) ", 
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List " supplier="TA" listapi={ta_pricing_pdf}  supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search Pricing Pdf"/>,
  },
   {
    id: '5',
   label:"Create Retail Ta-Petro Bulk Pricing", 
    component: <PricingCommon taxOption={false} tableTitle="Pricing PDF List " listapi={ta_pricing_pdf}  table={true}  invoiceType="Retail" apiName={create_pricing_pdf} pricingDate={true} supplier={true} supplier_ids="3" testingEmail={true} title="Create Retail Bulk Pricing PDF" btnTitle="Search Company"/>,
  },
   {
    id: '6',
    label: " Mail Retail Ta-Petro Bulk Pricing "
     
    , 
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List " supplier="TA" listapi={ta_pricing_pdf} supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search Pricing PDF"/>,
  },
 
  
];