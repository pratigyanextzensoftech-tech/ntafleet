import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
import PricingCommon from '../../Components/pricing/PricingCommon';
export const OwnerOperatorRackTab = [
  {
    id: '1',
    label: 'Update ESSO Owner Operator Rack Cent',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
    component: <PricingCommon pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={""}/>
,
  },
  {
    id: '2',
    label: 'Owner ESSO Operator Rack Cent List',
    // component: <RackCentList title="Filters" btnTitle="Search" />,
    component: <PricingCommon company={true}  fromUpto={true} title="Filters" btnTitle="Search" apiname={""} />,
  },
   {
    id: '3',
    label: 'Update  Ultramar Owner Operator Rack Cent',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
        component: <PricingCommon pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={""}/>
   }
,
 {
    id: '4',
    label: 'Owner Ultramar  Operator Rack Cent List',
    // component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
        component: <PricingCommon pricingDate={true} title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" apiname={""}/>

 }

];