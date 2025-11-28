import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import RackCentList from '../../Components/pricing/updateTaPetro/RackCentLIst';
import LoveRackCentList from '../../Components/pricing/updateLoveRack/LOveRackCentList';
import UploadEssoGroupRackForm from '../../Components/pricing/essoGroup/UploadEssoGroupRackForm';
import EssoGroupForm from '../../Components/pricing/essoGroup/EssoGroupForm';
import PricingCommon from '../../Components/pricing/PricingCommon';
export const EssoGroupRackTab = [
  {
    id: '1',
    label: 'Update ESSO Group Rack Cent',
    // component: <UpdateFgRack title=" Update ESSO Group Rack Cent" btnTitle="Search Group" />
     component: <PricingCommon title=" Update ESSO Group Rack Cent" btnTitle="Search Group" apiname={""}/>
,
  },
  {
    id: '2',
    label: 'Upload ESSO Group Rack Cent ',
    // component: <UploadEssoGroupRackForm title="Upload ESSO Group Rack Cent " btnTitle="Upload Rack Pricing" />,
    component: <PricingCommon csvFile={true} title="Upload ESSO Group Rack Cent " btnTitle="Upload Rack Pricing" apiname={""}/>,
  },
   {
    id: '3',
    label: 'ESSO Group  Cent List ',
    component: <EssoGroupForm tabletitle="ESSO Group Rack Cent List"  title="Filters " btnTitle="Upload Rack Pricing" />
   }
,
 {
    id: '4',
    label: 'ESSO Group Rack Cent List (New)',
    component: <EssoGroupForm tabletitle="ESSO Group Rack Cent List (New)" title="Filters" btnTitle="Search " />
 }

];