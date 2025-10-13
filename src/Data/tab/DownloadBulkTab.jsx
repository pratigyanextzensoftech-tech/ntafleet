import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';

import UploadEssoGroupRackForm from '../../Components/pricing/essoGroup/UploadEssoGroupRackForm';
import EssoGroupForm from '../../Components/pricing/essoGroup/EssoGroupForm';
import CreateBulkForm from '../../Components/pricing/downloadBulk/CreateBulkForm';
import EssoPricing from '../../Components/pricing/pricing_list/EssoPricing';
import TaPetro from '../../Components/pricing/pricing_list/TaPetro';
import LovePricing from '../../Components/pricing/pricing_list/LovePricing';
import MultiDateForm from '../../Components/pricing/downloadBulk/MultiDateForm';
export const DownloadBulkTab = [
  {
    id: '1',
    label: 'Create Bulk Price Sheet',
    component: <CreateBulkForm title=" Download Bulk Price Sheet " btnTitle="Create Excel " />
,
  },
  {
    id: '2',
    label: 'ESSO Bulk Price Sheet',
    component: <EssoPricing title="Search ESSO Bulk Price Sheet " btnTitle="Search Excel" />,
  },
   {
    id: '3',
    label: 'TA-Petro Bulk Price Sheet',
    component: <TaPetro tabletitle="Search Ta-Petro Bulk Price Sheet "  title="Filters " btnTitle="Search Excel" />
   }
,
 {
    id: '4',
    label: 'LOVES Bulk Price Sheet',
    component: <LovePricing tabletitle="Search Loves Bulk Price Sheet " title="Filters" btnTitle="Search Excel" />
 },
 {
    id: '5',
    label: 'Download Multi Date Bulk Price Sheet',
    component: <MultiDateForm tabletitle="Download Multi Date Bulk Price Sheet" title="Download Multi Date Bulk Price Sheet" btnTitle="Crete Excel" />
 }

];