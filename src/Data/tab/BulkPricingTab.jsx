
// import CreateBulkPrice from '../../Components/pricing/bulk_price/CreateBulkPrice';
// import MailBulkPrice from '../../Components/pricing/bulk_price/MailBulkPrice';
import { create_pricing_pdf,pricing_pdf } from '../../api';
import PricingCommon from '../../Components/pricing/PricingCommon';
export const BulkPricingTab = [
  {
    id: '1',
    label:"Create Bulk Pricing PDF",
    component: <PricingCommon listapi={pricing_pdf}  table={true} validation={true} invoiceType="" tax="" apiName={create_pricing_pdf} supplier={true} testingEmail={true} pricingDate={true} btnTitle="Create pricing Pdf" title="Create Bulk Pricing PDF "/>,
  },
  {
    id: '2',
    label:"Mail Bulk Pricing PDF",
    component: <PricingCommon supplier={true} invoiceType="" apiName={create_pricing_pdf} pricingDate={true} btnTitle="Search Pricing Pdf"   title="Mail Bulk Pricing PDF"/>,
  },
  

];
