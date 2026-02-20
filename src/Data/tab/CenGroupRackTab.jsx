
import CenGroupRackcentList from '../../Components/pricing/cenGroup/CenGroupRackCentList';
import UploadCenGroupRackForm from '../../Components/pricing/cenGroup/UploadCenGroupRackForm';
import UpdateCen from '../../Components/pricing/cenGroup/UpdateCen';
export const CenGroupRackTab = [
  {
    id: '1',
    label: 'Update Cenovus Group Rack Cent',
    component: <UpdateCen title=" Update Cenovus Group Rack Cent" btnTitle="Search Group" />
     
  },
  {
    id: '2',
    label: 'Upload Cenovus Group Rack Cent ',
    component: <UploadCenGroupRackForm title="Upload Cenovus Group Rack Cent " btnTitle="Upload Rack Pricing" />,
  },
   {
    id: '3',
    label: 'Cenovus Group  Cent List ',
    component: <CenGroupRackcentList tabletitle="Cenovus Group Rack Cent List"  title="Filters " btnTitle="Search" />
   }
,
//  {
//     id: '4',
//     label: 'ESSO Group Rack Cent List (New)',
//     component: <EssoGroupForm tabletitle="ESSO Group Rack Cent List (New)" title="Filters" btnTitle="Search " />
//  }
];