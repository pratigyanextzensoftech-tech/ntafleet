import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
import LoveRackCentList from '../../Components/pricing/updateLoveRack/LOveRackCentList';
import UploadEssoGroupRackForm from '../../Components/pricing/essoGroup/UploadEssoGroupRackForm';
import EssoGroupForm from '../../Components/pricing/essoGroup/EssoGroupForm';
import PricingCommon from '../../Components/pricing/PricingCommon';
import UpdateEsso from '../../Components/pricing/essoGroup/UpdateEsso';
import EssoGroupRackcentList from '../../Components/pricing/essoGroup/EssoGroupRackcentList';
import UpdateIrving from '../../Components/pricing/irvingGroup/UpdateIrving';
import IrvingGroupList from '../../Components/pricing/irvingGroup/IrvingGroupList';
import UploadIrving from '../../Components/pricing/irvingGroup/UploadIrving';
export const IrvingGroupRackTab = [
  {
    id: '1',
    label: 'Update Irving Group Rack Cent',
    component: <UpdateIrving title=" Update Irving Group Rack Cent" btnTitle="Search Group" />
     
  },
  // {
  //   id: '2',
  //   label: 'Upload Irving Group Rack Cent ',
  //   // component: <UploadEssoGroupRackForm title="Upload ESSO Group Rack Cent " btnTitle="Upload Rack Pricing" />,
  //   component: <UploadIrving  title="Upload Irving Group Rack Cent " btnTitle="Upload Rack Pricing" apiname={""}/>,
  // },
   {
    id: '3',
    label: 'Irving Group  Cent List ',
    component: <IrvingGroupList tabletitle="Irving Group Rack Cent List"  title="Filters " btnTitle="Search" />
   }
,
 
];