
import CreateReportOwner from '../../Components/reports/createReport/CreateOwnerOperatorReport';
import EssoGroupForm from '../../Components/location/manageGroup/EssoGroupForm';
import EssoCityForm from '../../Components/location/manageGroup/EssoCityForm';
export const ManageGroupTab = [
  {
    id: '1',
    label:"Manage Esso Group",
    component: <EssoGroupForm title="Manage Esso Group"/>,
  },
  {
    id: '2',
    label:"Manage Esso City",
    component: <EssoCityForm title="Manage Esso City"/>,
  },
   {
    id: '3',
    label:"Manage Ultramar Group",
    component: <EssoGroupForm title="Manage Ultramar Group"/>,
  },
   {
    id: '4',
    label:"Manage Ultramar City",
    component: <EssoCityForm title="Manage Ultramar City"/>,
  },
  
 
  
];

