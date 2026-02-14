import UpdateFgRack from '../../Components/pricing/updateFg/UpdateFgRack';
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import { dummytabledata,tableColumns } from '../Table/Defaultdata';
import UploadEssoGroupRackForm from '../../Components/pricing/essoGroup/UploadEssoGroupRackForm';
import EssoGroupForm from '../../Components/pricing/essoGroup/EssoGroupForm';
export const DownloadBulkTableTab = [
  {
    id: '1',
    label: 'Create Bulk Price Sheet',
    component: <DataTableComponent tableData={dummytabledata} tableColumns={tableColumns} title=" Download Bulk Price Sheet "  />
,
  },
  {
    id: '2',
    label: 'ESSO Bulk Price Sheet',
    component: <DataTableComponent tableData={dummytabledata} tableColumns={tableColumns} title="Search ESSO Bulk Price Sheet " btnTitle="Search Excel" />,
  },
   {
    id: '3',
    label: 'TA-Petro Bulk Price Sheet',
    component: <DataTableComponent tableData={dummytabledata} tableColumns={tableColumns} tabletitle="Search Ta-Petro Bulk Price Sheet "  title="Filters " btnTitle="Search Excel" />
   }
,
 {
    id: '4',
    label: 'LOVES Bulk Price Sheet',
    component: <DataTableComponent tableData={dummytabledata} tableColumns={tableColumns} tabletitle="Search Loves Bulk Price Sheet " title="Filters" btnTitle="Search Excel" />
 },
 {
    id: '5',
    label: 'Download Multi Date Bulk Price Sheet',
    component: <DataTableComponent tableData={dummytabledata} tableColumns={tableColumns} tabletitle="Download Multi Date Bulk Price Sheet" title="Download Multi Date Bulk Price Sheet" btnTitle="Crete Excel" />
 }
];