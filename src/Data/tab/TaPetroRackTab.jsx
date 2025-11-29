import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
import PricingCommon from '../../Components/pricing/PricingCommon';
export const TaPetroRackTab = [
  {
    id: '1',
    label: 'Update Ta-Petro Rack Cent',
    component: <PricingCommon pricingDate={true} title="  Multiple Ta-Petro Rack Cent Entry" btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'Ta-Petro Rack Cent List',
    component: <PricingCommon company={true}  fromUpto={true}  title="Filters" btnTitle="Search" />,
  }
];