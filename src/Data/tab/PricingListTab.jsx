import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';
import FlyingJ from '../../Components/pricing/pricing_list/FlyingJ';
import EssoPricing from '../../Components/pricing/pricing_list/EssoPricing';
import FjPricing from '../../Components/pricing/uploadPricing/FjPricing';
import LovePricing from '../../Components/pricing/pricing_list/LovePricing';
import TaPetro from '../../Components/pricing/pricing_list/TaPetro';
import Ultramar from '../../Components/pricing/pricing_list/Ultramar';

export const pricingListTab = [
  {
    id: '1',
    label:"Flying J"  , 
    component: <FlyingJ title="Search Flying J Pricing" btnTitle="Search Data"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Ta-Petro  - <strong> [Capped]</strong>
      </>
    ), 
    component: <TaPetro title="Search TA-Petro Pricing List (Capped)" btnTitle="Search Data"/>,
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
    component: <TaPetro title="Search TA-Petro Pricing List (Actual)" btnTitle="Search Data"/>,
  },
 {
    id: '4',
    label:" Esso ", 
    component: <EssoPricing title="Search ESSO Pricing" btnTitle="Search Data"/>,
  },
   {
    id: '5',
    label:  (
      <>
      Love  - <strong> [Capped]</strong>
      </>
    )
   ,
    component: <LovePricing title="Search LOVES Pricing List (Capped)" btnTitle="Search Data"/>,
  },
   {
    id: '6',
    label: 
     (
      <>
       Love  - <strong> [Actual]</strong>
      </>
    ), 
    component: <LovePricing title="Search LOVES Pricing List (Actual)" btnTitle="Search Data"/>,
  },
   {
    id: '7',
    label: "Ultramar",
    
    component: <Ultramar title="Search ULTRAMAR Pricing" btnTitle="Search Data"/>,
  },
  
];