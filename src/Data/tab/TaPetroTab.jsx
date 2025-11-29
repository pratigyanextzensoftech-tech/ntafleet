import CreateRetailTaPetro from '../../Components/pricing/taPetroBulk/CreateRetailTaPetro';
import CreateTaPetro from '../../Components/pricing/taPetroBulk/CreateTaPetro';
import MailTaPetro from '../../Components/pricing/taPetroBulk/MailTaPetro';
import PricingCommon from '../../Components/pricing/PricingCommon';
export const TaPetroTab = [
  {
    id: '1',
    label:"Create Ta-Petro Bulk Pricing"  , 
    component: <PricingCommon validation={true} pricingDate={true} supplier={true} supplier_ids="3" testingEmail={true} discountType={true} title="Create Bulk Pricing PDF" btnTitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
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
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search pricing Pdf"/>,
  },
 {
    id: '4',
    label:" Mail Ta-Petro Bulk Pricing (Non-Customer) ", 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search Pricing Pdf"/>,
  },
   {
    id: '5',
   label:"Create Retail Ta-Petro Bulk Pricing", 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="3" testingEmail={true} title="Create Retail Bulk Pricing PDF" btnTitle="Search Company"/>,
  },
   {
    id: '6',
    label: " Mail Retail Ta-Petro Bulk Pricing "
     
    , 
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="3" title="Mail Bulk Pricing PDF" btnTitle="Search Pricing PDF"/>,
  },
 
  
];