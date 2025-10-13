import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
export const OwnerOperatorRackTab = [
  {
    id: '1',
    label: 'Update ESSO Owner Operator Rack Cent',
    component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
,
  },
  {
    id: '2',
    label: 'Owner ESSO Operator Rack Cent List',
    component: <RackCentList title="Filters" btnTitle="Search" />,
  },
   {
    id: '3',
    label: 'Update  Ultramar Owner Operator Rack Cent',
    component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
   }
,
 {
    id: '4',
    label: 'Owner Ultramar  Operator Rack Cent List',
    component: <UpdateFgRack title=" Multiple Owner Operator Rack Cent Entry" btnTitle="Search Rack Company" />
 }

];