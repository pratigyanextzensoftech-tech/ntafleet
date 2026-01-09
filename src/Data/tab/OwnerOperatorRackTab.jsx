import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
import PricingCommon from '../../Components/pricing/PricingCommon';
import { owner_rack_cent,ul_owner_rack_cent } from '../../api';
export const OwnerOperatorRackTab = [
  {
    id: '1',
    label: 'Update ESSO Owner Operator Rack Cent',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
    component: <PricingCommon validation={true}  pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={owner_rack_cent} />
,
  },
  {
    id: '2',
    label: 'Owner ESSO Operator Rack Cent List',
    component: <RackCentList apiname={owner_rack_cent} title="Filters" btnTitle="Search" />,
    // component: <PricingCommon company={true}  fromUpto={true} title="Filters" btnTitle="Search" apiname={owner_rack_cent} />,
  },

   {
    id: '3',
    label: 'Update  Ultramar Owner Operator Rack Cent',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
        component: <PricingCommon  validation={true} pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={""}/>
   }
,
 {
    id: '4',
    label: 'Owner Ultramar  Operator Rack Cent List',
    component: <RackCentList apiname={ul_owner_rack_cent} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
        // component: <PricingCommon pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={ul_owner_rack_cent}/>

 }

];