import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
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
    component: <RackCentList title="Filters" btnTitle="Search" />,
  }
];