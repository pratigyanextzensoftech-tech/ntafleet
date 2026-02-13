import PricingCommon from "../../Components/pricing/PricingCommon";
import PricingListCommon from "../../Components/pricing/pricing_list/PricingListCommon";
import {
  ta_pricing_actual as TA_ACTUAL_API,
  ta_pricing as TA_CAPPED_API,
  esso_pricing as esso_pricing,
  love_pricing as LOVE_CAPPED_API,
  love_pricing_actual as LOVE_ACTUAL_API,
  ul_pricing as ULTRAMAR_API,
  irv_pricing as IRVING_API,
  pricing
} from "../../api";
export const PricingTab = [
  {
    id: '1',
    label:"Flying J"  , 
    component: <PricingListCommon apiName={pricing}  btnTitle="Search Data" />,
  },
  {
    id: '2',
    label:
       (
      <>
       Ta-Petro  - <strong> [Capped]</strong>
      </>
    ), 
     component: <PricingListCommon  supplier_ids="3" apiName={TA_CAPPED_API}  btnTitle="Search Data"/>,
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
    component: <PricingListCommon  supplier_ids="3" apiName={TA_ACTUAL_API}  btnTitle="Search Data"/>,
  },
 {
    id: '4',
    label:" Esso ", 
    component:  <PricingListCommon  supplier_ids="6" apiName={esso_pricing} btnTitle="Search Data"/>,
  },
   {
    id: '5',
    label:  (
      <>
      Love  - <strong> [Capped]</strong>
      </>
    )
   ,
    component: <PricingListCommon  supplier_ids="7"   apiName={LOVE_CAPPED_API}  btnTitle="Search Data" /> ,
  },
   {
    id: '6',
    label: 
     (
      <>
       Love  - <strong> [Actual]</strong>
      </>
    ), 
    component:  <PricingListCommon supplier_ids="7"  apiName={LOVE_ACTUAL_API}  btnTitle="Search Data"/>,
  },
   {
    id: '7',
    label: "Ultramar",
    
    component: <PricingListCommon  supplier_ids="10" apiName={ULTRAMAR_API} btnTitle="Search Data"/>,
  },
   {
    id: '8',
    label:
       (
      <>
       Irving 
      </>
    ), 
     component: <PricingListCommon  supplier_ids="5" apiName={IRVING_API}  btnTitle="Search Data"/>,
  },
  
];