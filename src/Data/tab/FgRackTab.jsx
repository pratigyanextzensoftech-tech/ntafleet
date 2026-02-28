
import PricingCommon from '../../Components/pricing/PricingCommonIndex';
import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import FgRackCent from '../../Components/pricing/updateFg/FgRackCent';
import { rack_cent } from '../../api';
export const FgRack = [
  {
    id: '1',
    label: 'Update FG Rack Cent',
    // component: <PricingCommon pricingDate={true} title="Multiple FG Rack Cent Entry " btnTitle="Search Rack Company" />
    component: <UpdateFgRack title="Multiple FG Rack Cent Entry " btnTitle="Search Rack Company" apiName=""/>

,
  },
  {
    id: '2',
    label: 'FG Rack Cent List',
    // component: <PricingCommon pricingDate={true} company={true} rackus={true} rackca={true} title="Filters" btnTitle="Search" />,
    component: <FgRackCent  title="Filters" btnTitle="Search" apiName={rack_cent} />,
  }
];