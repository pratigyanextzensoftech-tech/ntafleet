
import { tableColumns,dummytabledata } from '../Table/Defaultdata';
import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import FgRackCent from '../../Components/pricing/updateFg/FgRackCent';
export const FgRack = [
  {
    id: '1',
    label: 'Update FG Rack Cent',
    component: <UpdateFgRack title="Multiple FG Rack Cent Entry " btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'FG Rack Cent List',
    component: <FgRackCent title="Filters" btnTitle="Search" />,
  }
];