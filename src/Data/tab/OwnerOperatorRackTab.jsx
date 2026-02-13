import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
import PricingCommon from '../../Components/pricing/PricingCommon';
import UpdateEssoOwner from '../../Components/pricing/ownerOperator/UpdateEssoOwner';
import EssoOwnerRackList from '../../Components/pricing/ownerOperator/EssoOwnreRackList';
import UlOwnerList from '../../Components/pricing/ownerOperator/UlOwnerList';
import UpdateUlOwner from '../../Components/pricing/ownerOperator/UpdateUlOwner';
import { owner_rack_cent,ul_owner_rack_cent } from '../../api';
export const OwnerOperatorRackTab = [
  {
    id: '1',
    label: 'Update ESSO Owner Operator Rack Cent',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
    component: <UpdateEssoOwner  title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company"  />
,
  },
  {
    id: '2',
    label: 'Owner ESSO Operator Rack Cent List',
    component: <EssoOwnerRackList  title="Filters" btnTitle="Search" />,
    // component: <PricingCommon company={true}  fromUpto={true} title="Filters" btnTitle="Search" apiname={owner_rack_cent} />,
  },

   {
    id: '3',
    label: 'Update  Ultramar Owner Operator Rack Cent',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
        component: <UpdateUlOwner  title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
   }
,
 {
    id: '4',
    label: 'Owner Ultramar  Operator Rack Cent List',
    component: <UlOwnerList  title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
        // component: <PricingCommon pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={ul_owner_rack_cent}/>

 }

];