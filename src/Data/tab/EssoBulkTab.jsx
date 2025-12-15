import PricingCommon from '../../Components/pricing/PricingCommon';
import { create_pricing_pdf,esso_pricing_pdf } from '../../api';

export const EssoBulkTab = [
  {
    id: '1',
    label:"Create ESSO PDF (Without Tax)",
    component: <PricingCommon apiName={create_pricing_pdf} listapi={esso_pricing_pdf} tax= "No" table={true} pricingDate={true} supplier={true} supplier_ids="6" testingEmail={true} validation={true} btnTitle="Create  Pricing PDF (Without Tax)" title="Create Bulk Pricing PDF (Without Tax) "/>,
  },
  {
    id: '2',
    label:"Mail ESSO PDF (Without Tax)",
    component: <PricingCommon table={true} pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (Without Tax)"   title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
  
  {
    id: '3',
    label: "Create ESSO PDF (With Tax)",
    component: <PricingCommon tax= "Yes" table={true} listapi={esso_pricing_pdf} apiName={create_pricing_pdf}  pricingDate={true} supplier={true} supplier_ids="6" testingEmail={true} validation={true} btnTitle="Create Pricing PDF (With Tax)" title="Create Bulk Pricing PDF (With Tax)
"/>,
  },
   {
    id: '4',
    label:"Mail ESSO PDF (With Tax)",
    component:  <PricingCommon table={true} pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (With Tax)"   title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
 
  
   {
    id: '5',
    label:"Mail ESSO PDF (Without Tax)",
    component: <PricingCommon table={true} pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (Without Tax)" title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
    {
    id: '6',
    label:"Mail ESSO PDF (With Tax)",
    component: <PricingCommon table={true} pricingDate={true} supplier={true} supplier_ids="6" btnTitle="Search Pricing PDF (With Tax)" title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
];
