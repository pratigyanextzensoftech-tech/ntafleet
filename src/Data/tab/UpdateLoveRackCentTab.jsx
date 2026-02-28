import PricingCommon from '../../Components/pricing/PricingCommonIndex';
import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import UpdateLoveRack from '../../Components/pricing/updateLoveRack/UpdateLoveRack';
import LoveRackCentList from '../../Components/pricing/updateLoveRack/LOveRackCentList';
export const UpdateLoveRackTab = [
  {
    id: '1',
    label: 'Update Love Rack Cent',
    component: <UpdateLoveRack  apiName={""} title=" Multiple Love Rack Cent Entry" btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'Love Rack Cent List',
    // component: <PricingCommon company={true} discountType={true} fromUpto={true} title="Filters" btnTitle="Search" />,
    component: <LoveRackCentList  title="Filters" btnTitle="Search" />,
  }
];