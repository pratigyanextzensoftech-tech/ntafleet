import PricingCommon from '../../Components/pricing/PricingCommon';
import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import LoveRackCentList from '../../Components/pricing/updateLoveRack/LOveRackCentList';
export const UpdateLoveRackTab = [
  {
    id: '1',
    label: 'Update Love Rack Cent',
    component: <PricingCommon apiName={""} title=" Multiple Love Rack Cent Entry" btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'Love Rack Cent List',
    component: <LoveRackCentList title="Filters" btnTitle="Search" />,
  }
];