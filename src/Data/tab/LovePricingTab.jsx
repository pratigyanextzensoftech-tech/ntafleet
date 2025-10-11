import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import CreateLoveBulk from '../../Components/pricing/loveBulk/CreateLoveBulk';
import MailLoveBulk from '../../Components/pricing/loveBulk/MailLoveBulk';
import EssoPricing from '../../Components/pricing/singlePricingPdf/EssoPdf';
import LovePricing from '../../Components/pricing/singlePricingPdf/LovesPdf';
import TaPetro from '../../Components/pricing/singlePricingPdf/TaPetro';
import CreateRetailTaPetro from '../../Components/pricing/taPetroBulk/CreateRetailTaPetro';
import CreateTaPetro from '../../Components/pricing/taPetroBulk/CreateTaPetro';
import MailTaPetro from '../../Components/pricing/taPetroBulk/MailTaPetro';
export const LovePricingTab = [
  {
    id: '1',
    label:"Create LOVE Bulk Pricing PDF"  , 
    component: <CreateLoveBulk title="Create Bulk Pricing PDF" btnTtitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Love Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <MailLoveBulk title="Mail Bulk Pricing PDF" btnTtitle="Search pricing Pdf"/>,
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