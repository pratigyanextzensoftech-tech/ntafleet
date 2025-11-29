import PricingCommon from '../../Components/pricing/PricingCommon';
import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import LoveRackCentList from '../../Components/pricing/updateLoveRack/LOveRackCentList';
export const UpdateLoveRackTab = [
  {
    id: '1',
    label: 'Update Love Rack Cent',
    component: <PricingCommon pricingDate={true} apiName={""} title=" Multiple Love Rack Cent Entry" btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'Love Rack Cent List',
    component: <PricingCommon company={true} discountType={true} fromUpto={true} title="Filters" btnTitle="Search" />,
  }
];