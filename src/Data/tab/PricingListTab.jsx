import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import EssoPricing from '../../Components/pricing/uploadPricing/EssoPricing';
import FjPricing from '../../Components/pricing/uploadPricing/FjPricing';
import LovePricing from '../../Components/pricing/uploadPricing/LovePricing';
import TaPetro from '../../Components/pricing/uploadPricing/TaPetro';
import Ultramar from '../../Components/pricing/uploadPricing/UltramarPricing';

export const pricingListTab = [
  {
    id: '1',
    label:"Flying J"  , 
    component: <FjPricing title="Upload FJ Pricing" btnTtitle="Upload Pricing"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Ta-Petro  - <strong> [Capped]</strong>
      </>
    ), 
    component: <TaPetro title="Upload Ta-Petro Pricing (Capped)" btnTtitle="Upload Pricing"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Ta-Petro  - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <TaPetro title="Upload Ta-Petro Pricing (Capped)" btnTtitle="Upload Pricing"/>,
  },
 {
    id: '4',
    label:" Esso ", 
    component: <EssoPricing title="Upload Esso Pricing" btnTtitle="Upload Pricing"/>,
  },
   {
    id: '5',
    label:  (
      <>
      Love  - <strong> [Capped]</strong>
      </>
    )
   ,
    component: <LovePricing title="Upload Love Pricing (Capped)" btnTtitle="Upload Love Pricing"/>,
  },
   {
    id: '6',
    label: 
     (
      <>
       Love  - <strong> [Actual]</strong>
      </>
    ), 
    component: <LovePricing title="Upload Love Pricing (Capped)" btnTtitle="Upload Love Pricing"/>,
  },
   {
    id: '7',
    label: "Ultramar",
    
    component: <Ultramar title="Upload ULTRAMAR Pricing" btnTtitle="Upload ULTRAMAR Pricing"/>,
  },
  
];