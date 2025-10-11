import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import EssoPricing from '../../Components/pricing/singlePricingPdf/EssoPdf';
import LovePricing from '../../Components/pricing/singlePricingPdf/LovesPdf';
import TaPetro from '../../Components/pricing/singlePricingPdf/TaPetro';
import Ultramar from '../../Components/pricing/singlePricingPdf/UltramarPdf';
import FlyingJPdf from '../../Components/pricing/singlePricingPdf/FlyingJPdf';
export const SinglepricingTab = [
  {
    id: '1',
    label:"Flying J Pdf"  , 
    component: <FlyingJPdf title="Create FJ Pricing PDF" btnTtitle="Create FJ Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Ta-Petro Pdf  - <strong> [Capped]</strong>
      </>
    ), 
    component: <TaPetro title="Create Ta-Petro Pricing PDF (Capped)" btnTtitle="Create pricing Pdf"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Ta-Petro Pdf - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <TaPetro title="Create Ta-Petro Pricing PDF (Actual)" btnTtitle="Create pricing Pdf"/>,
  },
 {
    id: '4',
    label:" Esso Pdf (without Text) ", 
    component: <EssoPricing title="Create ESSO Pricing PDF (Without Tax)" btnTtitle="Create ESSO Pricing PDF (Without Tax)"/>,
  },
   {
    id: '5',
   label:" Esso Pdf (with Text) ", 
    component: <EssoPricing title="Create ESSO Pricing PDF (With Tax)" btnTtitle="Create ESSO Pricing PDF (With Tax)"/>,
  },
   {
    id: '6',
    label: 
     (
      <>
       Love Pdf  - <strong> [Capped]</strong>
      </>
    ), 
    component: <LovePricing title="Create LOVE Pricing PDF (Capped)" btnTtitle="Create LOVE Pricing PDF"/>,
  },
  {
    id: '7',
    label: 
     (
      <>
       Love Pdf  - <strong> [Actual]</strong>
      </>
    ), 
    component: <LovePricing title="Create LOVE Pricing PDF (Actual)" btnTtitle="Create LOVE Pricing PDF"/>,
  },
   {
    id: '8',
    label: "Ultramar Pdf",
    
    component: <Ultramar title="Create ULTRAMAR Pricing PDF" btnTtitle="Create ULTRAMAR Pricing PDF"/>,
  },
  
];