import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import FgRackCent from '../../Components/pricing/updateFg/FgRackCent';
export const TaPetroRackTab = [
  {
    id: '1',
    label: 'Update Ta-Petro Rack Cent',
    component: <UpdateFgRack title="  Multiple Ta-Petro Rack Cent Entry" btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'Ta-Petro Rack Cent List',
    component: <FgRackCent title="Filters" btnTitle="Search" />,
  }
];