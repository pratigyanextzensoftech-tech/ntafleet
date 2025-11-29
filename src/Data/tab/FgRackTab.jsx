
import PricingCommon from '../../Components/pricing/PricingCommon';
export const FgRack = [
  {
    id: '1',
    label: 'Update FG Rack Cent',
    component: <PricingCommon pricingDate={true} title="Multiple FG Rack Cent Entry " btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'FG Rack Cent List',
    component: <PricingCommon pricingDate={true} company={true} rackus={true} rackca={true} title="Filters" btnTitle="Search" />,
  }
];