import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import EssoPricing from '../../Components/pricing/singlePricingPdf/EssoPdf';
import LovePricing from '../../Components/pricing/singlePricingPdf/LovesPdf';
import TaPetro from '../../Components/pricing/singlePricingPdf/TaPetro';
import CreateRetailTaPetro from '../../Components/pricing/taPetroBulk/CreateRetailTaPetro';
import CreateTaPetro from '../../Components/pricing/taPetroBulk/CreateTaPetro';
import MailTaPetro from '../../Components/pricing/taPetroBulk/MailTaPetro';
export const TaPetroTab = [
  {
    id: '1',
    label:"Create Ta-Petro Bulk Pricing"  , 
    component: <CreateTaPetro title="Create Bulk Pricing PDF" btnTtitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <MailTaPetro title="Mail Bulk Pricing PDF" btnTtitle="Search pricing Pdf"/>,
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
    component: <MailTaPetro title="Mail Bulk Pricing PDF" btnTtitle="Search pricing Pdf"/>,
  },
 {
    id: '4',
    label:" Mail Ta-Petro Bulk Pricing (Non-Customer) ", 
    component: <MailTaPetro title="Mail Bulk Pricing PDF" btnTtitle="Search Pricing Pdf"/>,
  },
   {
    id: '5',
   label:"Create Retail Ta-Petro Bulk Pricing", 
    component: <CreateRetailTaPetro title="Create Retail Bulk Pricing PDF" btnTtitle="Search Company"/>,
  },
   {
    id: '6',
    label: " Mail Retail Ta-Petro Bulk Pricing "
     
    , 
    component: <MailTaPetro title="Mail Bulk Pricing PDF" btnTtitle="Search Pricing PDF"/>,
  },
 
  
];