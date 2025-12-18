
import TaPetroRackCent from '../../Components/pricing/updateTaPetro/TaPetroRackCent';
import UpdateTaPetroRackCent from '../../Components/pricing/updateTaPetro/UpdateTaPetroRackCent';
export const TaPetroRackTab = [
  {
    id: '1',
    label: 'Update Ta-Petro Rack Cent',
    component: <UpdateTaPetroRackCent     title="  Multiple Ta-Petro Rack Cent Entry" btnTitle="Search Rack Company" />,
  },
  {
    id: '2',
    label: 'Ta-Petro Rack Cent List',
    component: <TaPetroRackCent   title="Filters" btnTitle="Search" />,
  }
];