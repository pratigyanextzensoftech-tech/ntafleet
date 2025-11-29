import PricingCommon from '../../Components/pricing/PricingCommon';
export const EssoBulkTab = [
  {
    id: '1',
    label:"Create ESSO PDF (Without Tax)",
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="6" testingEmail={true} validation={true} btnTitle="Create  Pricing PDF (Without Tax)" title="Create Bulk Pricing PDF (Without Tax) "/>,
  },
  {
    id: '2',
    label:"Mail ESSO PDF (Without Tax)",
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (Without Tax)"   title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
  
  {
    id: '3',
    label: "Create ESSO PDF (With Tax)",
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="6" testingEmail={true} validation={true} btnTitle="Create Pricing PDF (With Tax)" title="Create Bulk Pricing PDF (With Tax)
"/>,
  },
   {
    id: '4',
    label:"Mail ESSO PDF (With Tax)",
    component:  <PricingCommon pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (With Tax)"   title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
 
  
   {
    id: '5',
    label:"Mail ESSO PDF (Without Tax)",
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (Without Tax)" title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
    {
    id: '6',
    label:"Mail ESSO PDF (With Tax)",
    component: <PricingCommon pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (With Tax)" title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
];
