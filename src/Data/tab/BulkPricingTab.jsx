
import CreateBulkPrice from '../../Components/pricing/bulk_price/CreateBulkPrice';
import MailBulkPrice from '../../Components/pricing/bulk_price/MailBulkPrice';
export const BulkPricingTab = [
  {
    id: '1',
    label:"Create Bulk Pricing PDF",
    component: <CreateBulkPrice btnTtitle="Create pricing Pdf" title="Create Bulk Pricing PDF "/>,
  },
  {
    id: '2',
    label:"Mail Bulk Pricing PDF",
    component: <MailBulkPrice btnTtitle="Search Pricing Pdf"   title="Mail Bulk Pricing PDF"/>,
  },
  

];
