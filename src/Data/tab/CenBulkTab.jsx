import MailPricingCommon from '../../Components/pricing/MailPricingCommon';
import PricingCommon from '../../Components/pricing/PricingCommon';
import { create_pricing_pdf,cen_pricing_pdf } from '../../api';

export const CenBulkTab = [
  {
    id: '1',
    label:"Create Cenovus PDF (Without Tax)",
    component: <PricingCommon taxOption={false} tableTitle="Pricing PDF List (Without Tax)"  apiName={create_pricing_pdf} listapi={cen_pricing_pdf} tax= "No"  pricingDate={true} supplier={true} supplier_ids="11" testingEmail={true} validation={true} btnTitle="Create  Pricing PDF (Without Tax)" title="Create Bulk Pricing PDF (Without Tax) "/>,
  },
  {
    id: '2',
    label:"Mail Cenovus PDF (Without Tax)",
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List (Without Tax)" supplier="CENOVUS" listapi={cen_pricing_pdf}  tax= "No" supplier_ids="6" btnTitle="Search Pricing PDF (Without Tax)"   title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
  
  {
    id: '3',
    label: "Create Cenovus PDF (With Tax)",
    component: <PricingCommon taxOption={false} tableTitle="Pricing PDF List (With Tax)" tax= "Yes"  listapi={cen_pricing_pdf} apiName={create_pricing_pdf}  pricingDate={true} supplier={true} supplier_ids="11" testingEmail={true} validation={true} btnTitle="Create Pricing PDF (With Tax)" title="Create Bulk Pricing PDF (With Tax)
"/>,
  },
   {
    id: '4',
    label:"Mail Cenovus PDF (With Tax)",
    component:  <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List (With Tax)"
     supplier="CENOVUS" listapi={cen_pricing_pdf} tax= "Yes"  supplier_ids="11" btnTitle="Search Pricing PDF (With Tax)"   title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
 
  
   { 
    id: '5',
    label:"Mail Cenovus PDF (Without Tax)",
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List (Without Tax)" supplier="CENOVUS" listapi={cen_pricing_pdf} tax= "No"  supplier_ids="11" btnTitle="Search Pricing PDF (Without Tax)" title="Mail Bulk Pricing PDF (Without Tax)"/>,
  },
    {
    id: '6',
    label:"Mail Cenovus PDF (With Tax)",
    component: <MailPricingCommon taxOption={false} tableTitle="Pricing PDF List (With Tax)" listapi={cen_pricing_pdf} tax= "Yes" supplier_ids="11"   supplier="CENOVUS" btnTitle="Search Pricing PDF (With Tax)" title="Mail Bulk Pricing PDF (With Tax)"/>,
  },
];
